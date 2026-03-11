import { SEGMENT_DEGREE, WHEEL_SEGMENTS } from "@/app/lib/spin";
import type { ThrUser } from "@/app/types/game";

type SpinSectionProps = {
  user: ThrUser;
  rotationDegree: number;
  isSpinning: boolean;
  spinResult: number | null;
  onSpin: () => Promise<void>;
};

export function SpinSection({
  user,
  rotationDegree,
  isSpinning,
  spinResult,
  onSpin,
}: SpinSectionProps) {
  return (
    <section
      id="spin"
      className="pt-20 min-h-[70vh] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Halo, {user.name}</h2>
        <p className="text-slate-400 mt-2">
          Sisa Putaran Anda:{" "}
          <span className="text-amber-400 font-bold text-xl">
            {user.spins_left}
          </span>
        </p>
        <p className="text-slate-400">
          Total Terkumpul:{" "}
          <span className="text-green-400 font-bold text-xl">
            Rp {user.total_prize.toLocaleString("id-ID")}
          </span>
        </p>
      </div>

      <div className="relative w-72 h-72 md:w-96 md:h-96">
        <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-transparent border-t-red-500 z-10 filter drop-shadow-md"></div>

        <div
          className="w-full h-full rounded-full border-8 border-slate-700 shadow-[0_0_40px_rgba(251,191,36,0.15)] overflow-hidden relative"
          style={{
            transform: `rotate(${rotationDegree}deg)`,
            transition: "transform 5s cubic-bezier(0.2, 0.8, 0.1, 1)",
          }}
        >
          {WHEEL_SEGMENTS.map((prize, index) => {
            const rotateAngle = index * SEGMENT_DEGREE;
            const bgColor =
              index % 2 === 0
                ? "bg-amber-400 text-slate-900"
                : "bg-slate-800 text-amber-400";

            return (
              <div
                key={index}
                className={`absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left flex items-center justify-center border-l border-slate-600/30 ${bgColor}`}
                style={{
                  transform: `rotate(${rotateAngle}deg) skewY(-45deg)`,
                }}
              >
                <span
                  className="font-bold text-sm md:text-base -rotate-45"
                  style={{
                    transform: "skewY(45deg) rotate(22.5deg) translateY(-40px)",
                  }}
                >
                  {prize >= 100000 ? `${prize / 1000}K` : prize}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={onSpin}
        disabled={isSpinning || user.spins_left <= 0}
        className="mt-12 px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:from-slate-600 disabled:to-slate-700 disabled:text-slate-400 text-slate-900 font-extrabold text-lg rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] transform active:scale-95 transition-all"
      >
        {isSpinning
          ? "MEMUTAR..."
          : user.spins_left > 0
            ? "SPIN SEKARANG"
            : "JATAH HABIS"}
      </button>

      {spinResult !== null && (
        <div className="mt-6 p-4 bg-green-500/20 border border-green-500 rounded text-green-400 font-bold animate-bounce">
          Selamat! Anda mendapatkan Rp {spinResult.toLocaleString("id-ID")}
        </div>
      )}
    </section>
  );
}
