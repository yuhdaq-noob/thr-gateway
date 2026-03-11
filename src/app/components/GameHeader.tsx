export function GameHeader() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700/80 py-3 px-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 text-lg flex items-center gap-2 select-none">
          <span>🎰</span> THR RIGS
        </div>
        <nav className="flex items-center gap-1 text-sm font-semibold">
          <a
            href="#spin"
            className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-amber-300 hover:bg-amber-500/10 transition-all"
          >
            Spin
          </a>
          <a
            href="#klasemen"
            className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-amber-300 hover:bg-amber-500/10 transition-all"
          >
            Klasemen
          </a>
          <a
            href="#info"
            className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-amber-300 hover:bg-amber-500/10 transition-all"
          >
            SLA Info
          </a>
        </nav>
      </div>
    </header>
  );
}
