import type { LeaderboardEntry } from "@/app/types/game";

type LeaderboardSectionProps = {
  leaderboard: LeaderboardEntry[];
};

const RANK_LABELS = ["01", "02", "03"];

export function LeaderboardSection({ leaderboard }: LeaderboardSectionProps) {
  return (
    <section id="klasemen" className="pt-8 md:pt-10">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
          Klasemen
        </p>
        <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">
          Peringkat hadiah peserta
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Daftar ini diperbarui otomatis setelah putaran berhasil. Tiga peserta
          teratas mendapat sorotan utama untuk memudahkan pemantauan.
        </p>
        <div className="mt-4 inline-flex items-center rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-400">
          Diperbarui otomatis setelah putaran berhasil
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/65 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.28)]">
        {leaderboard.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 px-6 py-10 text-center text-slate-400">
            Belum ada peserta yang tercatat di klasemen. Hasil putaran pertama
            akan langsung muncul di sini.
          </div>
        ) : (
          <ul className="space-y-3">
            {leaderboard.map((player, idx) => (
              <li
                key={idx}
                className={`flex items-center justify-between rounded-2xl border px-4 py-4 transition-colors
                  ${
                    idx === 0
                      ? "border-amber-500/40 bg-amber-500/10 shadow-sm shadow-amber-500/10"
                      : idx === 1
                        ? "border-slate-500/40 bg-slate-400/10"
                        : idx === 2
                          ? "border-orange-700/40 bg-orange-700/10"
                          : "border-slate-700/50 bg-slate-800/60 hover:border-amber-500/20"
                  }`}
              >
                <span className="flex items-center gap-3 font-semibold">
                  <span className="w-8 shrink-0 text-center text-lg">
                    {idx < 3 ? (
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 text-xs font-bold tracking-[0.2em] text-amber-200">
                        {RANK_LABELS[idx]}
                      </span>
                    ) : (
                      <span className="text-slate-600 text-sm font-mono">
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
                    <span className="mt-0.5 block text-xs font-normal text-slate-500">
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
