type LoginFormProps = {
  inputName: string;
  inputPhone: string;
  loginError: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
};

export function LoginForm({
  inputName,
  inputPhone,
  loginError,
  onNameChange,
  onPhoneChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 font-sans text-slate-100">
      {/* Subtle decorative glow orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Hero header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 select-none">🎰</div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 tracking-tight">
            GATEWAY THR
          </h1>
          <p className="text-slate-500 mt-1 text-xs tracking-widest uppercase font-semibold">
            2026 Edition
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full border border-slate-700/80 ring-1 ring-amber-500/10"
        >
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
                value={inputName}
                onChange={(e) => onNameChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-900/80 border border-slate-600 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all placeholder-slate-600 text-sm"
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
                value={inputPhone}
                onChange={(e) => onPhoneChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-900/80 border border-slate-600 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all placeholder-slate-600 text-sm"
                placeholder="Cth: 08123456789"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-extrabold py-3.5 rounded-lg transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-400/50 active:scale-[0.98] text-base tracking-wide mt-1"
            >
              🎁 Mulai Gacha THR
            </button>
          </div>
        </form>

        <p className="text-center text-slate-600 text-xs mt-6 select-none">
          Selamat Idul Fitri 1447 H 🌙
        </p>
      </div>
    </div>
  );
}
