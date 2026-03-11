"use client";

import confetti from "canvas-confetti";
import { useEffect } from "react";
import { SEGMENT_DEGREE, WHEEL_SEGMENTS } from "@/app/lib/spin";
import type { ThrUser } from "@/app/types/game";

type SpinSectionProps = {
  user: ThrUser;
  rotationDegree: number;
  isSpinning: boolean;
  spinResult: number | null;
  onSpin: () => Promise<void>;
};

export function SpinSection({
  user,
  rotationDegree,
  isSpinning,
  spinResult,
  onSpin,
}: SpinSectionProps) {
  useEffect(() => {
    if (spinResult !== null && spinResult > 0) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { x: 0.3, y: 0.6 },
        colors: ["#f59e0b", "#f97316", "#fbbf24", "#ffffff", "#10b981"],
      });
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { x: 0.7, y: 0.6 },
        colors: ["#f59e0b", "#f97316", "#fbbf24", "#ffffff", "#10b981"],
      });
    }
  }, [spinResult]);

  return (
    <section
      id="spin"
      className="pt-20 min-h-[70vh] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">
          Halo, <span className="text-amber-400">{user.name}</span> \ud83d\udc4b
        </h2>
        <div className="mt-4 flex gap-4 justify-center">
          <div className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 min-w-[110px]">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
              Sisa Putaran
            </p>
            <p className="text-amber-400 font-bold text-2xl">
              {user.spins_left}
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 min-w-[140px]">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
              Total THR
            </p>
            <p className="text-green-400 font-bold text-xl">
              Rp {user.total_prize.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-72 h-72 md:w-96 md:h-96">
        {/* Pointer arrow */}
        <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[28px] border-l-transparent border-r-transparent border-t-red-500 filter drop-shadow-lg" />
        </div>

        {/* Spinning glow ring */}
        {isSpinning && (
          <div className="absolute inset-0 rounded-full animate-pulse ring-4 ring-amber-400/50 bg-amber-400/5" />
        )}

        <div
          className="w-full h-full rounded-full border-8 border-slate-600 shadow-[0_0_60px_rgba(251,191,36,0.2)] overflow-hidden relative"
          style={{
            transform: `rotate(${rotationDegree}deg)`,
            transition: "transform 5s cubic-bezier(0.2, 0.8, 0.1, 1)",
          }}
        >
          {WHEEL_SEGMENTS.map((prize, index) => {
            const rotateAngle = index * SEGMENT_DEGREE;
            const bgColor =
              index % 2 === 0
                ? "bg-amber-400 text-slate-900"
                : "bg-slate-800 text-amber-400";

            return (
              <div
                key={index}
                className={`absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left flex items-center justify-center border-l border-slate-600/30 ${bgColor}`}
                style={{
                  transform: `rotate(${rotateAngle}deg) skewY(-45deg)`,
                }}
              >
                <span
                  className="font-bold text-sm md:text-base"
                  style={{
                    transform: "skewY(45deg) rotate(22.5deg) translateY(-40px)",
                  }}
                >
                  {prize >= 100000 ? `${prize / 1000}K` : prize}
                </span>
              </div>
            );
          })}
        </div>

        {/* Center hub */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-full bg-slate-900 border-4 border-amber-400 shadow-lg" />
        </div>
      </div>

      <button
        onClick={onSpin}
        disabled={isSpinning || user.spins_left <= 0}
        className="mt-12 px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:shadow-none text-slate-900 font-extrabold text-lg rounded-full shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_40px_rgba(245,158,11,0.7)] active:scale-95 transition-all"
      >
        {isSpinning
          ? "\u23f3 MEMUTAR..."
          : user.spins_left > 0
            ? "\ud83c\udfb0 SPIN SEKARANG"
            : "\u274c JATAH HABIS"}
      </button>

      {spinResult !== null && (
        <div className="mt-6 px-8 py-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/60 rounded-xl font-bold text-base shadow-lg shadow-green-500/10 animate-pulse text-center">
          <span className="text-green-300">
            \ud83c\udf89 Selamat! Anda mendapatkan{" "}
          </span>
          <span className="text-white text-lg">
            Rp {spinResult.toLocaleString("id-ID")}
          </span>
        </div>
      )}
    </section>
  );
}
