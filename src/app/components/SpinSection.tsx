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
      className="scroll-mt-36 overflow-hidden pt-10 sm:scroll-mt-28 md:pt-12"
    >
      <div className="relative rounded-3xl border border-slate-800 bg-slate-900/72 p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
          <div>
            <div className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
              Portal Hadiah Lebaran
            </div>

            <div className="mt-4 max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight text-slate-100 md:text-4xl">
                Halo, <span className="text-amber-400">{user.name}</span>.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400 md:text-base">
                Ambil THR anda sekarang
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:max-w-xl">
              <div className="rounded-2xl border border-slate-700 bg-slate-950/55 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Sisa putaran
                </p>
                <p className="mt-2 text-2xl font-bold text-amber-300">
                  {user.spins_left}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/55 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Total hadiah
                </p>
                <p className="mt-2 text-2xl font-bold text-emerald-300">
                  Rp {user.total_prize.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/50 px-4 py-2 text-xs font-medium text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Hasil putaran langsung masuk ke total hadiah.
            </div>

            <div className="mt-6 max-w-xl text-sm leading-6 text-slate-500">
              {isSpinning
                ? "Putaran sedang diproses. Mohon tunggu hingga roda berhenti."
                : user.spins_left > 0
                  ? "Tekan tombol di bawah roda untuk memulai putaran berikutnya."
                  : "Kesempatan aktif sudah habis. Pantau hasil akhir Anda di bawah."}
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
                  <p className="mt-1 text-sm text-slate-300">
                    Nilai hadiah sudah otomatis ditambahkan ke total hadiah
                    Anda.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[22rem] flex-col items-center gap-5">
            <div className="relative h-72 w-72 md:h-[22rem] md:w-[22rem]">
              <div className="absolute inset-8 rounded-full bg-amber-400/6 blur-3xl" />

              <div className="absolute top-[-16px] left-1/2 z-10 -translate-x-1/2">
                <div className="h-0 w-0 border-l-[13px] border-r-[13px] border-t-[24px] border-l-transparent border-r-transparent border-t-rose-400 drop-shadow-md" />
              </div>

              {isSpinning && (
                <div className="absolute inset-0 animate-pulse rounded-full bg-amber-400/4 ring-2 ring-amber-400/24" />
              )}

              <div
                className="relative h-full w-full"
                style={{
                  transform: `rotate(${rotationDegree}deg)`,
                  transition: "transform 5s cubic-bezier(0.2, 0.8, 0.1, 1)",
                }}
              >
                <svg viewBox="0 0 400 400" className="h-full w-full">
                  {/* Outer border ring */}
                  <circle cx="200" cy="200" r="196" fill="#475569" />
                  <circle cx="200" cy="200" r="190" fill="transparent" />

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
                </svg>
              </div>
            </div>

            <button
              onClick={onSpin}
              disabled={isSpinning || user.spins_left <= 0}
              className="w-full rounded-full bg-amber-300 px-8 py-4 text-base font-bold text-slate-950 hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              {isSpinning
                ? "Sedang Memutar..."
                : user.spins_left > 0
                  ? "Putar Sekarang"
                  : "Kesempatan Sudah Habis"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
