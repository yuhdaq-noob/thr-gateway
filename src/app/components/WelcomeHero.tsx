"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ThrUser } from "@/app/types/game";

const SPONSORS = [
  {
    src: "/janda-removebg-preview.png",
    alt: "Logo sponsor Janda",
    width: 140,
    height: 64,
  },
  {
    src: "/nisacake.png",
    alt: "Logo sponsor Nisa Cake",
    width: 140,
    height: 64,
  },
  {
    src: "/sambung-removebg-preview.png",
    alt: "Logo sponsor Sambung",
    width: 140,
    height: 64,
  },
  {
    src: "/PDI-removebg-preview.png",
    alt: "Logo sponsor PDI",
    width: 140,
    height: 64,
  },
] as const;

type WelcomeHeroProps = {
  user: ThrUser;
  isMusicPlaying: boolean;
  musicNotice: string;
  onToggleMusic: () => Promise<void>;
};

export function WelcomeHero({
  user,
  isMusicPlaying,
  musicNotice,
  onToggleMusic,
}: WelcomeHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="sambutan" className="scroll-mt-30 sm:scroll-mt-20">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.14),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.9),rgba(2,6,23,0.96))] p-6 md:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
        <div className="absolute -top-20 right-[-4rem] h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="mt-5 max-w-2xl">
              <Image
                src="/thr-gateway.png"
                alt="Logo THR Gateway"
                width={300}
                height={300}
                className="mb-5 h-20 w-auto object-contain md:h-24"
                priority
              />
              <p className="text-sm font-medium text-slate-400">
                Selamat datang, {user.name}
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-50 md:text-5xl md:leading-[1.05]">
                Ramadhan Mubarak, Menuju Hari Kemenangan
              </h1>
            </div>

            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href="#spin"
                className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-200"
              >
                Ambil THR
              </a>

              <button
                type="button"
                onClick={() => void onToggleMusic()}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-medium text-slate-200 hover:border-amber-400/30 hover:text-slate-50"
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isMusicPlaying ? "bg-emerald-300" : "bg-slate-500"
                  }`}
                />
                {isMusicPlaying ? "Matikan Lagu" : "Putar Lagu Ramadhan"}
              </button>
            </div>

            {musicNotice && (
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {musicNotice}
              </p>
            )}
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-[17rem]"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.08,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          ></motion.div>
        </div>

        <div className="mt-2 rounded-[1.75rem] border border-slate-800 bg-slate-950/45 p-4 md:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">
            Sponsored by
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {SPONSORS.map((sponsor, index) => (
              <motion.div
                key={sponsor.src}
                className="flex min-h-20 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/65 px-4 py-3"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.12 + index * 0.06,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              >
                <Image
                  src={sponsor.src}
                  alt={sponsor.alt}
                  width={sponsor.width}
                  height={sponsor.height}
                  className="h-12 w-auto object-contain opacity-90"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
