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
  const normalizedSegments = WHEEL_SEGMENTS.map(
    (value) => Math.abs(Number(value)) || 0,
  );
  const prizeFormatter = new Intl.NumberFormat("id-ID");

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
                Semoga Beruntung,
                <br /> <span className="text-amber-400">{user.name}</span>.
              </h2>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 lg:max-w-xl">
              <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 px-3 py-3 sm:px-4 sm:py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300 sm:text-[11px]">
                  Sisa Gatcha
                </p>
                <p className="mt-1 text-lg font-bold leading-tight text-amber-300 sm:text-2xl tabular-nums">
                  {user.spins_left}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 px-3 py-3 sm:px-4 sm:py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300 sm:text-[11px]">
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
                    Hasil Gatcha terbaru
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
              <div className="pointer-events-none absolute inset-3 rounded-full border border-amber-300/30 shadow-[0_0_28px_rgba(251,191,36,0.32)]" />
              <div className="pointer-events-none absolute inset-[18%] rounded-full border border-slate-200/10" />

              <div className="absolute top-[-12px] left-1/2 z-30 -translate-x-1/2">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  className="drop-shadow-[0_8px_12px_rgba(244,63,94,0.45)]"
                  aria-hidden="true"
                >
                  <path d="M17 33L2 5H32L17 33Z" fill="#fb7185" />
                  <path d="M17 28L7 8H27L17 28Z" fill="#fda4af" opacity="0.9" />
                </svg>
              </div>

              {isSpinning && (
                <div className="absolute inset-0 animate-pulse rounded-full bg-amber-400/4 ring-2 ring-amber-400/24" />
              )}
              {spinResult !== null && !isSpinning && (
                <div className="absolute inset-0 animate-[pulse_0.9s_ease-out_1] rounded-full bg-amber-400/10 ring-2 ring-amber-300/30" />
              )}

              <div
                className="relative z-0 h-full w-full"
                style={{
                  transform: `rotate(${rotationDegree}deg)`,
                  transition: "transform 5s cubic-bezier(0.2, 0.8, 0.1, 1)",
                }}
              >
                <svg viewBox="0 0 400 400" className="h-full w-full">
                  <defs>
                    <radialGradient
                      id="segmentTexture"
                      cx="50%"
                      cy="40%"
                      r="65%"
                    >
                      <stop
                        offset="0%"
                        stopColor="#ffffff"
                        stopOpacity="0.18"
                      />
                      <stop
                        offset="60%"
                        stopColor="#ffffff"
                        stopOpacity="0.06"
                      />
                      <stop
                        offset="100%"
                        stopColor="#000000"
                        stopOpacity="0.12"
                      />
                    </radialGradient>
                    <radialGradient id="coinGradient" cx="35%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#fef9c3" />
                      <stop offset="45%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#b45309" />
                    </radialGradient>
                    <filter
                      id="outerGlow"
                      x="-30%"
                      y="-30%"
                      width="160%"
                      height="160%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="0"
                        stdDeviation="8"
                        floodColor="rgba(251,191,36,0.5)"
                      />
                    </filter>
                  </defs>

                  {/* Outer border ring */}
                  <circle
                    cx="200"
                    cy="200"
                    r="196"
                    fill="#1e293b"
                    stroke="#fbbf24"
                    strokeWidth="4"
                    filter="url(#outerGlow)"
                  />
                  <circle cx="200" cy="200" r="190" fill="transparent" />
                  <circle
                    cx="200"
                    cy="200"
                    r="184"
                    fill="transparent"
                    stroke="#1f2937"
                    strokeWidth="2"
                  />

                  {normalizedSegments.map((prize, index) => {
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
                    let textRotation = midAngle + 90;
                    if (textRotation > 90 && textRotation < 270) {
                      textRotation += 180;
                    }

                    const fill = index % 2 === 0 ? "#fbbf24" : "#1e293b";
                    const textFill = index % 2 === 0 ? "#0f172a" : "#fde68a";
                    const label = prizeFormatter.format(prize);

                    return (
                      <g key={index}>
                        <path
                          d={pathD}
                          fill={fill}
                          stroke="#334155"
                          strokeWidth="1.5"
                        />
                        <path d={pathD} fill="url(#segmentTexture)" />
                        <text
                          x={tx}
                          y={ty}
                          fill={textFill}
                          fontSize="18"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={`rotate(${textRotation.toFixed(2)}, ${tx}, ${ty})`}
                        >
                          {label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Center hub */}
                  <circle cx="200" cy="200" r="26" fill="#0f172a" />
                  <circle
                    cx="200"
                    cy="200"
                    r="22"
                    fill="url(#coinGradient)"
                    stroke="#fde68a"
                    strokeWidth="3"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="12"
                    fill="#f59e0b"
                    opacity="0.9"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="7"
                    fill="#0f172a"
                    opacity="0.35"
                  />
                </svg>
              </div>
            </div>

            <button
              onClick={onSpin}
              disabled={isSpinning || user.spins_left <= 0}
              className="w-full rounded-full bg-gradient-to-r from-[#facc15] to-[#d4a017] px-8 py-4 text-base font-bold text-slate-950 shadow-[0_14px_30px_rgba(234,179,8,0.35)] hover:from-[#eab308] hover:to-[#ca8a04] hover:shadow-[0_18px_38px_rgba(234,179,8,0.45)] active:translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
            >
              {isSpinning
                ? "Sedang Menghitung Dosa..."
                : user.spins_left > 0
                  ? "Gatcha Sekarang"
                  : "Kesempatan Habis"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
