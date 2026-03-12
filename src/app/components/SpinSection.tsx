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
      className="scroll-mt-28 overflow-hidden sm:scroll-mt-24 md:pt-12"
    >
      <div className="relative rounded-3xl border border-slate-800/80 bg-slate-900/72 p-6 shadow-[0_18px_40px_rgba(2,6,23,0.45)] md:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
          <div>

            <div className="mt-4 max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight text-slate-100 md:text-4xl">
                Semoga Beruntung, <span className="text-amber-400">{user.name}</span>.
              </h2>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 lg:max-w-xl">
              <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 px-3 py-3 sm:px-4 sm:py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-[11px]">
                  Sisa putaran
                </p>
                <p className="mt-1 text-lg font-bold leading-tight text-amber-300 sm:text-2xl tabular-nums">
                  {user.spins_left}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 px-3 py-3 sm:px-4 sm:py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-[11px]">
                  Total hadiah
                </p>
                <p className="mt-1 text-[15px] font-bold leading-tight text-emerald-300 sm:text-2xl tabular-nums whitespace-nowrap">
                  Rp {user.total_prize.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="mt-6 max-w-xl text-sm leading-6 text-slate-300">
              {isSpinning
                ? "Putaran sedang diproses. Sabar.."
                : user.spins_left > 0
                  ? "Bukan Judol loh ya 🗿."
                  : "Kesempatan sudah habis. "}
            </div>

            <div className="mt-6 max-w-xl">
              {spinResult !== null && (
                <div
                  aria-live="polite"
                  className="w-full rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-left"
                >
                  <p className="text-sm font-semibold text-emerald-300">
                    Hasil putaran terbaru
                  </p>
                  <p className="mt-1 text-2xl font-bold text-white">
                    Rp {spinResult.toLocaleString("id-ID")}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[22rem] flex-col items-center gap-5">
            <div className="relative h-72 w-72 md:h-[22rem] md:w-[22rem]">
              <div className="absolute inset-8 rounded-full bg-amber-400/6 blur-3xl" />
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_62%)]" />
              <div className="pointer-events-none absolute inset-3 rounded-full border border-amber-300/20 shadow-[0_0_28px_rgba(251,191,36,0.18)]" />
              <div className="pointer-events-none absolute inset-[18%] rounded-full border border-slate-200/10" />

              <div className="absolute top-[-16px] left-1/2 z-10 -translate-x-1/2">
                <div className="h-0 w-0 border-l-[13px] border-r-[13px] border-t-[24px] border-l-transparent border-r-transparent border-t-rose-400 drop-shadow-md" />
              </div>

              {isSpinning && (
                <div className="absolute inset-0 animate-pulse rounded-full bg-amber-400/4 ring-2 ring-amber-400/24" />
              )}
              {spinResult !== null && !isSpinning && (
                <div className="absolute inset-0 animate-[pulse_0.9s_ease-out_1] rounded-full bg-amber-400/10 ring-2 ring-amber-300/30" />
              )}

              <div
                className="relative z-10 h-full w-full"
                style={{
                  transform: `rotate(${rotationDegree}deg)`,
                  transition: "transform 5s cubic-bezier(0.2, 0.8, 0.1, 1)",
                }}
              >
                <svg viewBox="0 0 400 400" className="h-full w-full">
                  {/* Outer border ring */}
                  <circle cx="200" cy="200" r="196" fill="#475569" />
                  <circle cx="200" cy="200" r="190" fill="transparent" />
                  <circle
                    cx="200"
                    cy="200"
                    r="184"
                    fill="transparent"
                    stroke="#1f2937"
                    strokeWidth="2"
                  />

                  {WHEEL_SEGMENTS.map((prize, index) => {
                    const startAngle = index * SEGMENT_DEGREE - 90;
                    const midAngle = startAngle + SEGMENT_DEGREE / 2;
                    const startRad = (startAngle * Math.PI) / 180;
                    const endRad =
                      ((startAngle + SEGMENT_DEGREE) * Math.PI) / 180;
                    const midRad = (midAngle * Math.PI) / 180;

                    const r = 190;
                    const cx = 200;
                    const cy = 200;

                    const x1 = (cx + r * Math.cos(startRad)).toFixed(3);
                    const y1 = (cy + r * Math.sin(startRad)).toFixed(3);
                    const x2 = (cx + r * Math.cos(endRad)).toFixed(3);
                    const y2 = (cy + r * Math.sin(endRad)).toFixed(3);
                    const pathD = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;

                    const textR = r * 0.62;
                    const tx = (cx + textR * Math.cos(midRad)).toFixed(3);
                    const ty = (cy + textR * Math.sin(midRad)).toFixed(3);
                    const textRotation = (midAngle + 90).toFixed(2);

                    const fill = index % 2 === 0 ? "#fbbf24" : "#1e293b";
                    const textFill = index % 2 === 0 ? "#0f172a" : "#fde68a";
                    const label =
                      prize >= 100000 ? `${prize / 1000}K` : `${prize}`;

                    return (
                      <g key={index}>
                        <path
                          d={pathD}
                          fill={fill}
                          stroke="#334155"
                          strokeWidth="1.5"
                        />
                        <text
                          x={tx}
                          y={ty}
                          fill={textFill}
                          fontSize="20"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={`rotate(${textRotation}, ${tx}, ${ty})`}
                        >
                          {label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Center hub */}
                  <circle
                    cx="200"
                    cy="200"
                    r="18"
                    fill="#0f172a"
                    stroke="#fde68a"
                    strokeWidth="4"
                  />
                  <circle cx="200" cy="200" r="10" fill="#fbbf24" />
                </svg>
              </div>
            </div>

            <button
              onClick={onSpin}
              disabled={isSpinning || user.spins_left <= 0}
              className="w-full rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-200 px-8 py-4 text-base font-bold text-slate-950 shadow-[0_14px_30px_rgba(251,191,36,0.35)] hover:from-amber-200 hover:via-amber-100 hover:to-yellow-100 hover:shadow-[0_18px_38px_rgba(251,191,36,0.45)] active:translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
            >
              {isSpinning
                ? "Sedang Memutar..."
                : user.spins_left > 0
                  ? "Putar Sekarang"
                  : "Kesempatan Habis"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
