export function InfoSection() {
  return (
    <section id="info" className="pt-20 text-center">
      <h3 className="text-xl font-bold mb-4 text-amber-500">
        Informasi Pencairan
      </h3>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-lg mx-auto">
        <p className="text-slate-300 leading-relaxed">
          Sistem akan otomatis ditutup saat kuota 20 pengguna terpenuhi atau
          pada tanggal yang ditentukan.
          <br />
          <br />
          Semua saldo yang terkumpul bersifat final dan akan ditransfer secara
          serentak ke nomor DANA/GoPay Anda pada{" "}
          <strong className="text-white">H+7 Lebaran pukul 20:00 WIB</strong>.
          Tidak melayani pencairan di luar jadwal.
        </p>
      </div>
    </section>
  );
}
