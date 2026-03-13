export const WHEEL_SEGMENTS = [
  5000, 10000, 1000, 20000, 1500, 100000, 500, 50000, 15000, 2000,
] as const;

export const SEGMENT_DEGREE = 360 / WHEEL_SEGMENTS.length;
export const EXTRA_SPINS_DEGREE = 360 * 5;
export const SPIN_ANIMATION_MS = 10000;

export function calculateSpinDegree(currentDegree: number, prize: number) {
  const matchedIndexes = WHEEL_SEGMENTS.map((value, index) =>
    value === prize ? index : -1,
  ).filter((index) => index >= 0);

  const safeTargetIndex =
    matchedIndexes.length > 0
      ? matchedIndexes[Math.floor(Math.random() * matchedIndexes.length)]
      : 0;

  const currentNormalized = ((currentDegree % 360) + 360) % 360;
  const targetDegree =
    (360 - (safeTargetIndex + 0.5) * SEGMENT_DEGREE + 360) % 360;

  const maxSafeJitter = Math.max(0, SEGMENT_DEGREE / 2 - 3);
  const randomOffset = (Math.random() * 2 - 1) * maxSafeJitter;
  const desiredDegree = (targetDegree + randomOffset + 360) % 360;
  const deltaToTarget = (desiredDegree - currentNormalized + 360) % 360;

  return currentDegree + EXTRA_SPINS_DEGREE + deltaToTarget;
}
