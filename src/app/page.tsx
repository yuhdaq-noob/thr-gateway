"use client";

import { useCallback, useEffect, useState } from "react";
import { loginUser } from "./actions/auth";
import { executeSpin, getLeaderboard } from "./actions/game";
import { GameHeader } from "./components/GameHeader";
import { InfoSection } from "./components/InfoSection";
import { LeaderboardSection } from "./components/LeaderboardSection";
import { LoginForm } from "./components/LoginForm";
import { SpinSection } from "./components/SpinSection";
import { SPIN_ANIMATION_MS, calculateSpinDegree } from "./lib/spin";
import type { LeaderboardEntry, ThrUser } from "./types/game";

export default function GameGateway() {
  const [user, setUser] = useState<ThrUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [spinResult, setSpinResult] = useState<number | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

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
      setIsLoading(true);
      setLoginError("");

      try {
        const res = await loginUser(inputName, inputPhone);

        if (res.success && res.user) {
          localStorage.setItem("thr_user_phone", res.user.phone_number);
          localStorage.setItem("thr_user_name", res.user.name);
          setUser(res.user as ThrUser);
          fetchLeaderboard();
        } else {
          setLoginError(res.message);
        }
      } catch (error) {
        console.error(error);
        setLoginError("Terjadi kesalahan sistem. Coba lagi.");
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-mono">
        Memuat Sistem...
      </div>
    );
  }

  if (!user) {
    return (
      <LoginForm
        inputName={inputName}
        inputPhone={inputPhone}
        loginError={loginError}
        onNameChange={setInputName}
        onPhoneChange={setInputPhone}
        onSubmit={handleLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans scroll-smooth">
      <GameHeader />

      <main className="max-w-4xl mx-auto p-4 space-y-24 pb-24">
        <SpinSection
          user={user}
          rotationDegree={rotationDegree}
          isSpinning={isSpinning}
          spinResult={spinResult}
          onSpin={handleSpin}
        />
        <LeaderboardSection leaderboard={leaderboard} />
        <InfoSection />
      </main>
    </div>
  );
}
