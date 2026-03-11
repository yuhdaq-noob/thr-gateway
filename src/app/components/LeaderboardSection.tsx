import type { LeaderboardEntry } from "@/app/types/game";

type LeaderboardSectionProps = {
  leaderboard: LeaderboardEntry[];
};

const MEDALS = ["🥇", "🥈", "🥉"];

export function LeaderboardSection({ leaderboard }: LeaderboardSectionProps) {
  return (
    <section id="klasemen" className="pt-20">
      <h3 className="text-2xl font-bold mb-6 text-center pb-2 flex items-center justify-center gap-2">
        <span>🏆</span>
        <span>Top 20 Tracker</span>
      </h3>
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/80 max-w-2xl mx-auto">
        {leaderboard.length === 0 ? (
          <p className="text-center text-slate-500 py-8">
            Belum ada data terekam.
          </p>
        ) : (
          <ul className="space-y-2.5">
            {leaderboard.map((player, idx) => (
              <li
                key={idx}
                className={`flex justify-between items-center px-4 py-3 rounded-xl border transition-colors
                  ${
                    idx === 0
                      ? "bg-amber-500/10 border-amber-500/40 shadow-sm shadow-amber-500/10"
                      : idx === 1
                        ? "bg-slate-400/10 border-slate-500/40"
                        : idx === 2
                          ? "bg-orange-700/10 border-orange-700/40"
                          : "bg-slate-800/60 border-slate-700/50 hover:border-amber-500/20"
                  }`}
              >
                <span className="font-semibold flex items-center gap-3">
                  <span className="w-8 text-center text-lg shrink-0">
                    {idx < 3 ? (
                      MEDALS[idx]
                    ) : (
                      <span className="text-slate-600 text-sm font-mono">
                        #{idx + 1}
                      </span>
                    )}
                  </span>
                  <span className={idx < 3 ? "text-white font-bold" : ""}>
                    {player.name}
                  </span>
                </span>
                <span className="font-mono text-green-400 font-bold text-sm">
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
