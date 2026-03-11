export function GameHeader() {
  return (
    <header className="sticky top-0 z-50 bg-slate-800/90 backdrop-blur border-b border-slate-700 p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="font-bold text-amber-400">THR RIGS</div>
        <nav className="space-x-4 text-sm font-semibold">
          <a href="#spin" className="hover:text-amber-300 transition-colors">
            Spin
          </a>
          <a
            href="#klasemen"
            className="hover:text-amber-300 transition-colors"
          >
            Klasemen
          </a>
          <a href="#info" className="hover:text-amber-300 transition-colors">
            SLA Info
          </a>
        </nav>
      </div>
    </header>
  );
}
