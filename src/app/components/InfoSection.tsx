export function InfoSection() {
  return (
    <section
      id="info"
      className="scroll-mt-36 pt-8 pb-24 sm:scroll-mt-28 md:pt-10"
    >
      <div className="mb-7 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          Pencairan
        </p>
        <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-100">
          Informasi jadwal dan ketentuan pencairan
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Semua hadiah diproses secara terjadwal.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/65 p-6">
          <p className="text-sm font-semibold text-slate-100">Jadwal utama</p>
          <p className="mt-3 text-2xl font-bold text-amber-300">
            H+ Lebaran, pukul 20.00 WIB
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Sistem akan ditutup saat kuota{" "}
            <span className="font-semibold text-slate-200">20 peserta</span>{" "}
            terpenuhi atau pada batas waktu yang telah ditentukan oleh
           Saya.
          </p>
        </div>

        <div className="rounded-3xl border border-amber-500/20 bg-amber-500/10 p-6">
          <p className="text-sm font-semibold text-amber-200">
            Metode transfer
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-100">
            Hadiah dikirim ke akun DANA yang didaftarkan saat masuk
            ke portal.
          </p>
        </div>
      </div>
    </section>
  );
}
