"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

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
        initial={
          shouldReduceMotion ? false : { opacity: 0, y: 36, scale: 0.97 }
        }
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 16, mass: 0.85 }}
      >
        <div className="mb-7 text-center">
          <Image
            src="/thr-gateway.png"
            alt="Logo THR Gateway"
            width={300}
            height={300}
            className="mx-auto mb-4 h-16 w-auto object-contain sm:h-20"
            priority
          />
          <h1 className="text-4xl font-bold tracking-tight text-slate-100">
            THR Gateway
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Login untuk mengambil THR
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="w-full rounded-3xl border border-slate-800 bg-slate-900/72 p-7 backdrop-blur"
        >
          <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-950/55 px-4 py-3 text-sm leading-6 text-slate-300">
            NB: Nomor DANA digunakan hanya untuk pencairan hadiah sesuai
            kehendak <strong>Mas Admin Yang Terhormat</strong>
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
                placeholder="Bahlil Simanjuntak"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Nomor DANA
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
                placeholder="08123456789"
              />
              <br />
              <br />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 w-full rounded-xl bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-200 py-3.5 text-base font-bold tracking-wide text-slate-950 shadow-[0_12px_24px_rgba(251,191,36,0.35)] hover:from-amber-200 hover:via-amber-100 hover:to-yellow-100 hover:shadow-[0_16px_30px_rgba(251,191,36,0.45)] active:translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
              whileHover={
                shouldReduceMotion || isSubmitting
                  ? undefined
                  : { y: -2, scale: 1.01 }
              }
              whileTap={
                shouldReduceMotion || isSubmitting
                  ? undefined
                  : { y: 0, scale: 0.99 }
              }
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              {isSubmitting ? "Memverifikasi Data BMKG..." : "Login"}
            </motion.button>
          </div>
        </form>

        <div className="mt-5 space-y-1 text-center select-none">
          <p className="text-xs text-slate-400">Selamat Idul Fitri 1447 H 🌙</p>
          <p className="text-[11px] text-slate-500">© 2026 THR Gateway</p>
        </div>
      </motion.div>
    </div>
  );
}
