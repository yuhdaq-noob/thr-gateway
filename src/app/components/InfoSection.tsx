export function InfoSection() {
  return (
    <section id="info" className="pt-8 pb-24 md:pt-10">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          Pencairan
        </p>
        <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">
          Informasi jadwal dan ketentuan pencairan
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Semua hadiah diproses secara terjadwal. Informasi ini membantu peserta
          memahami kapan hadiah dikirim dan data apa yang digunakan saat
          transfer.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/65 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.3)]">
          <p className="text-sm font-semibold text-slate-100">Jadwal utama</p>
          <p className="mt-3 text-2xl font-bold text-amber-300">
            H+7 Lebaran, pukul 20.00 WIB
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Sistem akan ditutup saat kuota{" "}
            <span className="font-semibold text-slate-200">20 peserta</span>{" "}
            terpenuhi atau pada batas waktu yang telah ditentukan oleh
            penyelenggara.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-amber-500/20 bg-amber-500/10 p-6 shadow-[0_18px_50px_rgba(120,53,15,0.12)]">
          <p className="text-sm font-semibold text-amber-200">
            Metode transfer
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-100">
            Hadiah dikirim ke akun DANA atau GoPay yang didaftarkan saat masuk
            ke portal.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Pencairan di luar jadwal tidak dilayani. Pastikan nomor yang
            didaftarkan tetap aktif dan benar.
          </p>
        </div>
      </div>
    </section>
  );
}
