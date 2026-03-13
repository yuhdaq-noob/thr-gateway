import type { LeaderboardEntry } from "@/app/types/game";

type LeaderboardSectionProps = {
  leaderboard: LeaderboardEntry[];
};

const RANK_LABELS = ["01", "02", "03"];

export function LeaderboardSection({ leaderboard }: LeaderboardSectionProps) {
  return (
    <section
      id="klasemen"
      className="scroll-mt-28 pt-8 sm:scroll-mt-24 md:pt-10"
    >
      <div className="mb-7 max-w-2xl">
        <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-100">
          Top Global THR 👑
        </h3>
      </div>

      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-[0_18px_40px_rgba(2,6,23,0.45)]">
        {leaderboard.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700/70 bg-slate-950/50 px-6 py-10 text-center text-slate-300">
            Belum ada peserta yang tercatat di klasemen.
          </div>
        ) : (
          <ul className="space-y-3">
            {leaderboard.map((player, idx) => (
              <li
                key={idx}
                className={`flex items-center justify-between rounded-2xl border px-4 py-4
                  ${
                    idx === 0
                      ? "border-amber-500/40 bg-amber-500/10"
                      : idx === 1
                        ? "border-slate-500/40 bg-slate-400/10"
                        : idx === 2
                          ? "border-orange-700/40 bg-orange-700/10"
                          : "border-slate-700/60 bg-slate-800/55"
                  }`}
              >
                <span className="flex items-center gap-3 font-semibold">
                  <span className="w-8 shrink-0 text-center text-lg">
                    {idx < 3 ? (
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 text-xs font-bold tracking-[0.2em] text-amber-200">
                        {RANK_LABELS[idx]}
                      </span>
                    ) : (
                      <span className="text-sm font-mono text-slate-500">
                        #{idx + 1}
                      </span>
                    )}
                  </span>
                  <span>
                    <span
                      className={
                        idx < 3 ? "font-bold text-white" : "text-slate-100"
                      }
                    >
                      {player.name}
                    </span>
                    <span className="mt-0.5 block text-xs font-normal text-slate-300">
                      Peserta #{idx + 1}
                    </span>
                  </span>
                </span>
                <span className="font-mono text-sm font-bold text-emerald-300">
                  Rp {player.total_prize.toLocaleString("id-ID")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
