"use client";

import { motion, useReducedMotion } from "framer-motion";

type LoginFormProps = {
  inputName: string;
  inputPhone: string;
  isSubmitting: boolean;
  loginError: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
};

export function LoginForm({
  inputName,
  inputPhone,
  isSubmitting,
  loginError,
  onNameChange,
  onPhoneChange,
  onSubmit,
}: LoginFormProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-4 font-sans text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/70">
            <span className="h-2.5 w-2.5 rounded-sm bg-amber-300" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-100">
            THR Gateway
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Masuk untuk mulai putar hadiah dan pantau pencairan.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="w-full rounded-3xl border border-slate-800 bg-slate-900/72 p-7 backdrop-blur"
        >
          <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-950/55 px-4 py-3 text-sm leading-6 text-slate-300">
            Nomor DANA atau GoPay digunakan hanya untuk pencairan hadiah sesuai
            jadwal yang tertera.
          </div>

          {loginError && (
            <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-500/35 bg-red-500/10 p-3 text-sm text-red-300">
              <span className="mt-0.5">⚠️</span>
              <span>{loginError}</span>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                autoComplete="name"
                disabled={isSubmitting}
                value={inputName}
                onChange={(e) => onNameChange(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-amber-300 focus:outline-none"
                placeholder="Cth: Budi Santoso"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Nomor DANA / GoPay
              </label>
              <input
                type="text"
                required
                inputMode="tel"
                autoComplete="tel"
                pattern="^08[0-9]{8,13}$"
                title="Gunakan nomor aktif berformat 08xxxxxxxxxx"
                disabled={isSubmitting}
                value={inputPhone}
                onChange={(e) => onPhoneChange(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-amber-300 focus:outline-none"
                placeholder="Cth: 08123456789"
              />
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Pastikan nomor aktif, diawali 08, dan sesuai akun tujuan
                pencairan.
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 w-full rounded-xl bg-amber-300 py-3.5 text-base font-bold tracking-wide text-slate-950 hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              {isSubmitting ? "Memverifikasi Data..." : "Masuk ke Portal THR"}
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-xs text-slate-500 select-none">
          Selamat Idul Fitri 1447 H
        </p>
      </motion.div>
    </div>
  );
}
