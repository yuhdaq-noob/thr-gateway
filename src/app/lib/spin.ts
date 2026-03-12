export const WHEEL_SEGMENTS = [
  5000, 10000, 1000, 20000, 1500, 100000, 500, 50000,
] as const;

export const SEGMENT_DEGREE = 360 / WHEEL_SEGMENTS.length;
export const EXTRA_SPINS_DEGREE = 360 * 5;
export const SPIN_ANIMATION_MS = 5000;

export function calculateSpinDegree(currentDegree: number, prize: number) {
  const targetIndex = WHEEL_SEGMENTS.indexOf(
    prize as (typeof WHEEL_SEGMENTS)[number],
  );
  const safeTargetIndex = targetIndex >= 0 ? targetIndex : 0;
  const targetDegree = 360 - safeTargetIndex * SEGMENT_DEGREE;
  const randomOffset = Math.floor(Math.random() * 20) - 10;

  return currentDegree + EXTRA_SPINS_DEGREE + targetDegree + randomOffset;
}
