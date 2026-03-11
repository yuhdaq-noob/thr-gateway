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
    <section id="spin" className="pt-12 overflow-hidden md:pt-16">
      <div className="relative rounded-[2rem] border border-slate-800/90 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.08),_transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(2,6,23,0.96))] p-6 shadow-[0_20px_80px_rgba(2,6,23,0.42)] md:p-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_26rem]">
          <div>
            <div className="inline-flex items-center rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
              Portal Hadiah Lebaran
            </div>

            <div className="mt-5 max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Halo, <span className="text-amber-400">{user.name}</span>.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300 md:text-base">
                Gunakan kesempatan putaran Anda untuk mendapatkan hadiah THR,
                lalu pantau total hadiah dan status pencairannya di satu tempat.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 px-5 py-4 shadow-inner shadow-slate-950/30">
                <p className="text-sm font-medium text-slate-400">
                  Sisa putaran
                </p>
                <p className="mt-2 text-3xl font-bold text-amber-300">
                  {user.spins_left}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Kesempatan aktif yang masih bisa digunakan hari ini.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 px-5 py-4 shadow-inner shadow-slate-950/30">
                <p className="text-sm font-medium text-slate-400">
                  Total hadiah
                </p>
                <p className="mt-2 text-3xl font-bold text-emerald-300">
                  Rp {user.total_prize.toLocaleString("id-ID")}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Akumulasi hadiah yang sudah Anda kumpulkan.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/55 p-4 text-sm text-slate-300">
              <p className="font-semibold text-slate-100">Cara bermain</p>
              <p className="mt-2 leading-6 text-slate-300">
                Tekan tombol putar untuk mengambil hadiah secara acak. Hasil
                putaran akan langsung menambah total hadiah Anda dan klasemen
                diperbarui otomatis.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-start gap-4">
              <button
                onClick={onSpin}
                disabled={isSpinning || user.spins_left <= 0}
                className="w-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-8 py-4 text-base font-extrabold text-slate-950 shadow-[0_14px_32px_rgba(249,115,22,0.22)] transition-all hover:from-amber-300 hover:to-orange-300 hover:shadow-[0_16px_36px_rgba(249,115,22,0.26)] active:scale-[0.99] disabled:cursor-not-allowed disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400 disabled:shadow-none sm:w-auto"
              >
                {isSpinning
                  ? "Sedang Memutar..."
                  : user.spins_left > 0
                    ? "Putar Sekarang"
                    : "Kesempatan Sudah Habis"}
              </button>

              <p className="text-sm leading-6 text-slate-400">
                {isSpinning
                  ? "Putaran sedang diproses. Mohon tunggu hingga roda berhenti."
                  : user.spins_left > 0
                    ? "Setiap hasil putaran akan langsung menambah total hadiah dan memperbarui klasemen."
                    : "Semua kesempatan aktif sudah digunakan. Pantau hasil akhir dan jadwal pencairan di bawah."}
              </p>

              {spinResult !== null && (
                <div
                  aria-live="polite"
                  className="w-full rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-left shadow-lg shadow-emerald-950/10"
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

          <div className="relative mx-auto h-72 w-72 md:h-96 md:w-96">
            <div className="absolute inset-8 rounded-full bg-amber-400/8 blur-3xl" />

            <div className="absolute top-[-16px] left-1/2 z-10 -translate-x-1/2">
              <div className="h-0 w-0 border-l-[13px] border-r-[13px] border-t-[24px] border-l-transparent border-r-transparent border-t-rose-400 drop-shadow-md" />
            </div>

            {isSpinning && (
              <div className="absolute inset-0 animate-pulse rounded-full bg-amber-400/4 ring-4 ring-amber-400/28" />
            )}

            <div
              className="relative h-full w-full"
              style={{
                transform: `rotate(${rotationDegree}deg)`,
                transition: "transform 5s cubic-bezier(0.2, 0.8, 0.1, 1)",
              }}
            >
              <svg
                viewBox="0 0 400 400"
                className="h-full w-full drop-shadow-[0_0_36px_rgba(251,191,36,0.1)]"
              >
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
        </div>
      </div>
    </section>
  );
}
