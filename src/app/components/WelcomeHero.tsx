"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ThrUser } from "@/app/types/game";

const SPONSORS = [
  {
    src: "/janda-removebg-preview.png",
    alt: "Logo sponsor Janda",
    width: 140,
    height: 100,
  },
  {
    src: "/nisacake.png",
    alt: "Logo sponsor Nisa Cake",
    width: 140,
    height: 100,
  },
  {
    src: "/sambung-removebg-preview.png",
    alt: "Logo sponsor Sambung",
    width: 140,
    height: 100,
  },
  {
    src: "/PDI-removebg-preview.png",
    alt: "Logo sponsor PDI",
    width: 140,
    height: 100,
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
    <section id="sambutan" className="scroll-mt-28 sm:scroll-mt-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.14),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.9),rgba(2,6,23,0.96))] p-6 md:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
        <div className="absolute -top-20 right-[-4rem] h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center">
          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 30, scale: 0.98 }
            }
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 95,
              damping: 17,
              mass: 0.85,
            }}
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
              <p className="text-sm font-medium text-slate-300">
                Selamat datang, {user.name}
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-50 md:text-5xl md:leading-[1.05]">
                Ramadhan Mubarak, Menuju Hari Kemenangan
              </h1>
            </div>

            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <motion.a
                href="#spin"
                className="rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-200 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_24px_rgba(251,191,36,0.35)] hover:from-amber-200 hover:via-amber-100 hover:to-yellow-100 hover:shadow-[0_16px_30px_rgba(251,191,36,0.45)] active:translate-y-0.5"
                whileHover={
                  shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }
                }
                whileTap={
                  shouldReduceMotion ? undefined : { y: 0, scale: 0.98 }
                }
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
              >
                Ambil THR
              </motion.a>

              <motion.button
                type="button"
                onClick={() => void onToggleMusic()}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/70 px-5 py-3 text-sm font-medium text-slate-200 shadow-[0_10px_22px_rgba(2,6,23,0.35)] hover:border-amber-400/40 hover:bg-slate-800/70 hover:text-slate-50 hover:shadow-[0_12px_24px_rgba(2,6,23,0.45)] active:translate-y-0.5"
                whileHover={
                  shouldReduceMotion ? undefined : { y: -1.5, scale: 1.01 }
                }
                whileTap={
                  shouldReduceMotion ? undefined : { y: 0, scale: 0.98 }
                }
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isMusicPlaying ? "bg-emerald-300" : "bg-slate-500"
                  }`}
                />
                {isMusicPlaying ? "Matikan Musik" : "Putar Musik"}
              </motion.button>
            </div>

            {musicNotice && (
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {musicNotice}
              </p>
            )}
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-[17rem]"
            initial={
              shouldReduceMotion ? false : { opacity: 0, scale: 0.88, y: 18 }
            }
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 16,
              delay: 0.08,
            }}
          ></motion.div>
        </div>

        <div className="mt-2 rounded-[1.75rem] border border-slate-800/80 bg-slate-950/60 p-4 shadow-[0_20px_40px_rgba(2,6,23,0.45)] md:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200">
            Sponsored by
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {SPONSORS.map((sponsor, index) => (
              <motion.div
                key={sponsor.src}
                className="group relative flex min-h-20 items-center justify-center overflow-hidden rounded-2xl border border-slate-800/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(2,6,23,0.9))] px-4 py-3 shadow-[0_12px_28px_rgba(2,6,23,0.35)] transition duration-300 hover:border-amber-300/30 hover:shadow-[0_16px_36px_rgba(2,6,23,0.5)]"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={
                  shouldReduceMotion ? undefined : { y: -3, scale: 1.015 }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                  delay: 0.12 + index * 0.06,
                }}
              >
                <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.14),transparent_55%)]" />
                  <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
                </span>
                <Image
                  src={sponsor.src}
                  alt={sponsor.alt}
                  width={sponsor.width}
                  height={sponsor.height}
                  className="relative z-10 h-12 w-auto object-contain opacity-95 transition duration-300 group-hover:opacity-100 group-hover:drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
