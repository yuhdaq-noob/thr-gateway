export function InfoSection() {
  return (
    <section id="info" className="pt-20 text-center pb-24">
      <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
        <span>📋</span>
        <span className="text-amber-400">Informasi Pencairan</span>
      </h3>
      <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 max-w-lg mx-auto backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-slate-700" />
          <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest px-2">
            Jadwal &amp; SLA
          </span>
          <div className="h-px flex-1 bg-slate-700" />
        </div>
        <p className="text-slate-300 leading-relaxed text-sm">
          Sistem akan otomatis ditutup saat kuota{" "}
          <strong className="text-amber-400">20 pengguna</strong> terpenuhi atau
          pada tanggal yang ditentukan.
        </p>
        <div className="mt-5 p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
          <p className="text-amber-300 font-bold text-base">
            🕗 H+7 Lebaran &middot; Pukul 20:00 WIB
          </p>
          <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
            Transfer serentak ke DANA/GoPay masing-masing. Tidak melayani
            pencairan di luar jadwal.
          </p>
        </div>
      </div>
    </section>
  );
}
