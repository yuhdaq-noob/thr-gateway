# THR Gateway

THR Gateway adalah portal hadiah Lebaran berbasis Next.js + Supabase dengan alur login peserta, spin berhadiah, klasemen real-time, dan informasi pencairan.

## Fitur Utama

- Login peserta menggunakan nama dan nomor DANA/GoPay.
- Putaran hadiah dengan update total hadiah secara otomatis.
- Klasemen top peserta berdasarkan total hadiah.
- Informasi jadwal pencairan yang jelas dan terstruktur.

## Teknologi

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Supabase

## Menjalankan Project

1. Install dependency:

```bash
npm install
```

2. Siapkan environment di file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

3. Jalankan mode development:

```bash
npm run dev
```

4. Build production:

```bash
npm run build
npm run start
```

## Skrip NPM

- `npm run dev` — menjalankan server development.
- `npm run build` — build aplikasi untuk production.
- `npm run start` — menjalankan hasil build production.
- `npm run lint` — menjalankan linting.

## Catatan

- Gunakan `SUPABASE_SERVICE_ROLE_KEY` hanya di server dan jangan pernah mengeksposnya ke client.
