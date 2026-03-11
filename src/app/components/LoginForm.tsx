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
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 font-sans text-slate-100">
      <form
        onSubmit={onSubmit}
        className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-700"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-amber-400">
          GATEWAY THR 2026
        </h1>

        {loginError && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4 text-sm border border-red-500/50">
            {loginError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-slate-400">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={inputName}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full p-3 rounded bg-slate-900 border border-slate-600 focus:border-amber-400 focus:outline-none transition-colors"
              placeholder="Cth: Budi Santoso"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-400">
              Nomor DANA / GoPay
            </label>
            <input
              type="text"
              required
              value={inputPhone}
              onChange={(e) => onPhoneChange(e.target.value)}
              className="w-full p-3 rounded bg-slate-900 border border-slate-600 focus:border-amber-400 focus:outline-none transition-colors"
              placeholder="Cth: 08123456789"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold p-3 rounded transition-colors mt-4"
          >
            Mulai Gacha THR
          </button>
        </div>
      </form>
    </div>
  );
}
