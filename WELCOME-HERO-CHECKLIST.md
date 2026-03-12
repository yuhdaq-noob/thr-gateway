# Welcome Hero Checklist

Checklist terbaru untuk merapikan pengalaman setelah login: hero sambutan di atas, header yang lebih profesional, dan area putaran yang lebih ringkas serta efisien di desktop maupun mobile.

## Hero Sambutan

- [ ] Letakkan logo utama `/thr-gateway.png` di bagian paling atas hero, sebelum headline.
- [ ] Tampilkan headline utama: `Ramadhan Mubarak, Menuju Hari Kemenangan` tepat di bawah logo.
- [ ] Tambahkan subcopy singkat yang menjelaskan bahwa user sudah masuk ke portal hadiah THR.
- [ ] Pastikan CTA utama atau sekunder tetap mengarahkan user ke `#spin`.
- [ ] Jaga agar hero tetap terasa sebagai sambutan singkat, bukan menggantikan fungsi utama spin.

## Sponsor Area

- [ ] Tampilkan label kecil `Sponsored by` di bawah area hero utama.
- [ ] Tampilkan logo sponsor: `/janda-removebg-preview.png`, `/nisacake.png`, `/sambung-removebg-preview.png`, `/PDI-removebg-preview.png`.
- [ ] Gunakan susunan logo yang bersih dan konsisten, horizontal di desktop dan grid rapi di mobile.
- [ ] Samakan tinggi visual semua logo sponsor agar terlihat profesional walau rasio gambarnya berbeda.

## Header dan Nav

- [ ] Perbarui `GameHeader.tsx` agar tampak lebih profesional, lebih tenang, dan tidak terlalu dekoratif.
- [ ] Buat branding header lebih formal: ikon/logo kecil, nama produk, dan subtitle yang rapi.
- [ ] Rapikan pill nav agar jarak, padding, dan state aktifnya terlihat lebih presisi.
- [ ] Pastikan nav aktif otomatis berubah saat user scroll ke `Sambutan`, `Putaran`, `Klasemen`, dan `Pencairan`.
- [ ] Pastikan klik nav mengarah ke section yang tepat tanpa tertutup sticky header.
- [ ] Pastikan nav tetap nyaman dibaca dan disentuh pada layar mobile.

## Section Putaran

- [ ] Ringkas copy pada area putaran agar tidak terlalu banyak teks.
- [ ] Ubah kartu `Sisa putaran` dan `Total hadiah` menjadi lebih padat, fokus pada label dan angka utama.
- [ ] Kurangi deskripsi tambahan di bawah kartu statistik jika tidak benar-benar diperlukan.
- [ ] Tempatkan tombol `Putar Sekarang` tepat di bawah circle spin sebagai fokus utama interaksi.
- [ ] Pastikan susunan mobile tetap logis: informasi singkat di atas, roda spin di tengah, tombol tepat di bawah roda.
- [ ] Pastikan layout desktop tetap seimbang dan tidak terasa kosong setelah copy dipadatkan.

## Arah Visual

- [ ] Pertahankan palet gelap dengan aksen amber agar tetap konsisten dengan identitas saat ini.
- [ ] Beri ruang kosong yang cukup supaya tampilan terasa premium dan tidak sesak.
- [ ] Kurangi ornamen yang tidak penting, gunakan hanya glow atau highlight halus di area penting.
- [ ] Pastikan headline, logo, sponsor, dan tombol memiliki hirarki visual yang jelas.
- [ ] Gunakan motion ringan seperlunya, bukan animasi yang ramai.

## Responsivitas

- [ ] Pastikan hero tidak terlalu tinggi di mobile sehingga CTA utama tetap cepat terlihat.
- [ ] Pastikan logo utama dan sponsor tetap proporsional di layar kecil.
- [ ] Pastikan nav tidak pecah atau terlalu sempit pada lebar kecil.
- [ ] Pastikan tombol spin tetap mudah dijangkau jempol di perangkat mobile.

## Implementasi Teknis

- [ ] Update `WelcomeHero.tsx` agar struktur hero menjadi: logo utama -> headline -> subcopy -> CTA -> sponsor.
- [ ] Update `GameHeader.tsx` untuk polishing visual dan state aktif yang tetap stabil saat scroll.
- [ ] Update `SpinSection.tsx` untuk meringkas informasi dan memindahkan tombol ke bawah roda.
- [ ] Pertahankan `scroll-mt` atau offset section agar perpindahan anchor tetap presisi.

## Finishing

- [ ] Cek hasil akhir di desktop dan mobile untuk memastikan hierarchy terasa lebih profesional.
- [ ] Cek apakah section putaran kini lebih ringkas dan tidak memakan ruang berlebih.
- [ ] Cek apakah hero baru tetap relevan dengan alur: Sambutan -> Spin -> Klasemen -> Pencairan.
- [ ] Validasi lint dan build setelah perubahan UI diterapkan.
