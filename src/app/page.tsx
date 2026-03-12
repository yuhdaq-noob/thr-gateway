"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loginUser } from "./actions/auth";
import { executeSpin, getLeaderboard } from "./actions/game";
import { GameHeader } from "./components/GameHeader";
import { InfoSection } from "./components/InfoSection";
import { LeaderboardSection } from "./components/LeaderboardSection";
import { LoginForm } from "./components/LoginForm";
import { SectionReveal } from "./components/SectionReveal";
import { SpinSection } from "./components/SpinSection";
import { WelcomeHero } from "./components/WelcomeHero";
import { SPIN_ANIMATION_MS, calculateSpinDegree } from "./lib/spin";
import type { LeaderboardEntry, ThrUser } from "./types/game";

export default function GameGateway() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [user, setUser] = useState<ThrUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [spinResult, setSpinResult] = useState<number | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [musicPlayRequest, setMusicPlayRequest] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicNotice, setMusicNotice] = useState("");

  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [loginError, setLoginError] = useState("");

  const fetchLeaderboard = useCallback(async () => {
    try {
      const data = await getLeaderboard();
      setLeaderboard((data as LeaderboardEntry[]) ?? []);
    } catch (error) {
      console.error("Gagal memuat klasemen", error);
    }
  }, []);

  const playRamadhanMusic = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.55;
    audio.loop = true;

    try {
      await audio.play();
      setIsMusicPlaying(true);
      setMusicNotice("");
    } catch (error) {
      console.error("Gagal memutar audio Ramadhan", error);
      setIsMusicPlaying(false);
      setMusicNotice("Browser memerlukan klik untuk memulai lagu Ramadhan.");
    }
  }, []);

  const pauseRamadhanMusic = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    setIsMusicPlaying(false);
    setMusicNotice("");
  }, []);

  const toggleRamadhanMusic = useCallback(async () => {
    if (isMusicPlaying) {
      pauseRamadhanMusic();
      return;
    }

    await playRamadhanMusic();
  }, [isMusicPlaying, pauseRamadhanMusic, playRamadhanMusic]);

  const handleSpin = useCallback(async () => {
    if (isSpinning || !user || user.spins_left <= 0) return;

    setIsSpinning(true);
    setSpinResult(null);

    try {
      const res = await executeSpin(user.phone_number);

      if (!res.success) {
        alert(res.message);
        setIsSpinning(false);
        return;
      }

      if (
        typeof res.prize !== "number" ||
        typeof res.current_total !== "number" ||
        typeof res.spins_left !== "number"
      ) {
        throw new Error("Respons spin tidak valid.");
      }

      const actualPrize = res.prize;
      setRotationDegree((prev) => calculateSpinDegree(prev, actualPrize));

      setTimeout(() => {
        setSpinResult(actualPrize);
        setUser((prevUser) =>
          prevUser
            ? {
                ...prevUser,
                spins_left: res.spins_left,
                total_prize: res.current_total,
              }
            : prevUser,
        );
        fetchLeaderboard();
        setIsSpinning(false);
      }, SPIN_ANIMATION_MS);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan server saat spin.");
      setIsSpinning(false);
    }
  }, [fetchLeaderboard, isSpinning, user]);

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsAuthenticating(true);
      setLoginError("");

      try {
        const res = await loginUser(inputName, inputPhone);

        if (res.success && res.user) {
          localStorage.setItem("thr_user_phone", res.user.phone_number);
          localStorage.setItem("thr_user_name", res.user.name);
          setUser(res.user as ThrUser);
          setMusicPlayRequest((prev) => prev + 1);
          fetchLeaderboard();
        } else {
          setLoginError(res.message);
        }
      } catch (error) {
        console.error(error);
        setLoginError("Terjadi kesalahan sistem. Coba lagi.");
      } finally {
        setIsAuthenticating(false);
      }
    },
    [fetchLeaderboard, inputName, inputPhone],
  );

  useEffect(() => {
    let isMounted = true;

    const savedPhone = localStorage.getItem("thr_user_phone");
    const savedName = localStorage.getItem("thr_user_name");
    fetchLeaderboard();

    if (savedPhone && savedName) {
      loginUser(savedName, savedPhone).then((res) => {
        if (!isMounted) return;

        if (res.success && res.user) {
          setUser(res.user as ThrUser);
        } else {
          localStorage.removeItem("thr_user_phone");
          localStorage.removeItem("thr_user_name");
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [fetchLeaderboard]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handlePlay = () => setIsMusicPlaying(true);
    const handlePause = () => setIsMusicPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    if (!user || musicPlayRequest === 0) return;

    void playRamadhanMusic();
  }, [musicPlayRequest, playRamadhanMusic, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-400">
        <div className="mb-4 flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl border border-amber-400/15 bg-amber-400/10">
          <span className="h-3 w-3 rounded-sm bg-gradient-to-br from-amber-300 to-orange-400" />
        </div>
        <p className="text-sm font-semibold tracking-widest uppercase">
          Menyiapkan Portal Hadiah...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <LoginForm
        inputName={inputName}
        inputPhone={inputPhone}
        isSubmitting={isAuthenticating}
        loginError={loginError}
        onNameChange={setInputName}
        onPhoneChange={setInputPhone}
        onSubmit={handleLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 font-sans text-slate-100">
      <audio ref={audioRef} src="/ramadhan-sound.ogg" preload="auto" />
      <GameHeader />

      <main className="mx-auto max-w-5xl space-y-16 px-4 py-6 pb-20 md:px-6">
        <SectionReveal>
          <WelcomeHero
            user={user}
            isMusicPlaying={isMusicPlaying}
            musicNotice={musicNotice}
            onToggleMusic={toggleRamadhanMusic}
          />
        </SectionReveal>
        <SectionReveal>
          <SpinSection
            user={user}
            rotationDegree={rotationDegree}
            isSpinning={isSpinning}
            spinResult={spinResult}
            onSpin={handleSpin}
          />
        </SectionReveal>
        <SectionReveal>
          <LeaderboardSection leaderboard={leaderboard} />
        </SectionReveal>
        <SectionReveal>
          <InfoSection />
        </SectionReveal>

        <footer className="pt-4 text-center">
          <p className="text-sm text-slate-300">Selamat Idul Fitri 1447 H 🌙</p>
          <p className="mt-1 text-xs text-slate-500">© 2026 THR Gateway</p>
        </footer>
      </main>
    </div>
  );
}
