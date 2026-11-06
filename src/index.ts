function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function dimension(value: number): void {
  finite(value, 1e-6, 1e6);
}
export function curtainPlan(
  trackWidth: number,
  drop: number,
  panels = 2,
  fullness = 2,
  sideHem = 0,
  bottomHem = 0,
  header = 0,
): {
  finishedWidthPerPanel: number;
  cutWidthPerPanel: number;
  cutDrop: number;
  totalCutArea: number;
} {
  dimension(trackWidth);
  dimension(drop);
  integer(panels, 1, 1000);
  finite(fullness, 1, 10);
  for (const v of [sideHem, bottomHem, header]) finite(v, 0, 1e6);
  const finishedWidthPerPanel = (trackWidth * fullness) / panels,
    cutWidthPerPanel = finishedWidthPerPanel + 2 * sideHem,
    cutDrop = drop + bottomHem + header;
  return {
    finishedWidthPerPanel,
    cutWidthPerPanel,
    cutDrop,
    totalCutArea: cutWidthPerPanel * cutDrop * panels,
  };
}
