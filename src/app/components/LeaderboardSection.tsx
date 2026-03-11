import type { LeaderboardEntry } from "@/app/types/game";

type LeaderboardSectionProps = {
  leaderboard: LeaderboardEntry[];
};

export function LeaderboardSection({ leaderboard }: LeaderboardSectionProps) {
  return (
    <section id="klasemen" className="pt-20">
      <h3 className="text-2xl font-bold mb-6 text-center border-b border-slate-700 pb-2">
        Top 20 Tracker
      </h3>
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 max-w-2xl mx-auto shadow-inner">
        {leaderboard.length === 0 ? (
          <p className="text-center text-slate-500">Belum ada data terekam.</p>
        ) : (
          <ul className="space-y-3">
            {leaderboard.map((player, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center p-3 bg-slate-800 rounded border border-slate-700/50 hover:border-amber-500/30 transition-colors"
              >
                <span className="font-semibold flex items-center gap-3">
                  <span
                    className={`w-6 text-center ${idx < 3 ? "text-amber-400" : "text-slate-500"}`}
                  >
                    #{idx + 1}
                  </span>
                  {player.name}
                </span>
                <span className="font-mono text-green-400">
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
