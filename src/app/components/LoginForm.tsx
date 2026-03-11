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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 font-sans text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-500/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 shadow-[0_10px_30px_rgba(251,191,36,0.12)]">
            <span className="h-3 w-3 rounded-sm bg-gradient-to-br from-amber-300 to-orange-400" />
          </div>
          <h1 className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
            THR Gateway
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-300">
            Portal hadiah Lebaran untuk putaran THR dan pencairan terjadwal.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="w-full rounded-[1.75rem] border border-slate-800 bg-slate-900/78 p-8 shadow-[0_24px_70px_rgba(2,6,23,0.38)] backdrop-blur-xl"
        >
          <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm leading-6 text-slate-300">
            Nomor DANA atau GoPay digunakan hanya untuk pencairan hadiah sesuai
            jadwal yang tertera.
          </div>

          {loginError && (
            <div className="bg-red-500/15 text-red-300 p-3 rounded-lg mb-5 text-sm border border-red-500/40 flex items-start gap-2">
              <span className="mt-0.5">⚠️</span>
              <span>{loginError}</span>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-slate-400">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                autoComplete="name"
                disabled={isSubmitting}
                value={inputName}
                onChange={(e) => onNameChange(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/75 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition-all focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400/15"
                placeholder="Cth: Budi Santoso"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-slate-400">
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
                className="w-full rounded-xl border border-slate-700 bg-slate-950/75 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition-all focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400/15"
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
              className="mt-1 w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 py-3.5 text-base font-extrabold tracking-wide text-slate-950 shadow-[0_14px_30px_rgba(249,115,22,0.22)] transition-all hover:from-amber-300 hover:to-orange-300 hover:shadow-[0_16px_34px_rgba(249,115,22,0.26)] active:scale-[0.99] disabled:cursor-not-allowed disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400 disabled:shadow-none"
            >
              {isSubmitting ? "Memverifikasi Data..." : "Masuk ke Portal THR"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500 select-none">
          Selamat Idul Fitri 1447 H
        </p>
      </div>
    </div>
  );
}
