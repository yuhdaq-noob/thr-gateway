export function InfoSection() {
  return (
    <section
      id="info"
      className="scroll-mt-28 pt-8 pb-24 sm:scroll-mt-24 md:pt-10"
    >
      <div className="mb-7 max-w-2xl">
        <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 max-[390px]:text-[1.65rem]">
          Informasi Ketentuan
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-[0_18px_40px_rgba(2,6,23,0.45)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
          <p className="text-sm font-semibold text-slate-100">Jadwal utama</p>
          <p className="mt-3 text-2xl font-bold text-amber-300">
            H+ Lebaran, (pukul 20.00 WIB)
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Sistem akan ditutup saat kuota{" "}
            <span className="font-semibold text-slate-200">20 peserta</span>{" "}
            terpenuhi atau pada batas waktu yang telah ditentukan oleh{" "}
            <strong> Mas Admin Yang Terhormat.</strong>
          </p>
        </div>

        <div className="rounded-3xl border border-amber-500/25 bg-amber-500/10 p-6 shadow-[0_14px_30px_rgba(2,6,23,0.35)]">
          <p className="text-sm font-semibold text-amber-200">
            Metode transfer
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-100">
            Sistem akan mengirim hadiah ke akun <strong>DANA/ShopeePay</strong>{" "}
            yang didaftarkan saat Login pada waktu yang ditentukan oleh{" "}
            <strong>Mas Admin Yang Terhormat</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
