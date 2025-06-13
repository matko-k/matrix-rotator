export function rotateMatrix(matrix: number[][], times: number): number[][] {
  const n = matrix.length;
  const normalized = ((times % 4) + 4) % 4;

  if (normalized === 0) {
    // No rotation
    return matrix.map(row => row.slice());
  }
  if (normalized === 2) {
    // 180 degrees rotation: reverse rows and columns
    return matrix
      .map(row => row.slice().reverse())
      .reverse();
  }

  if (normalized === 1) {
    // 90 degrees right rotation
    const rotated: number[][] = Array.from({ length: n }, () => Array(n));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        rotated[j][n - i - 1] = matrix[i][j];
      }
    }
    return rotated;
  }

  if (normalized === 3) {
    // 270 degrees right rotation (or 90 degrees left)
    const rotated: number[][] = Array.from({ length: n }, () => Array(n));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        rotated[n - j - 1][i] = matrix[i][j];
      }
    }
    return rotated;
  }

  // fallback - return original
  return matrix.map(row => row.slice());
}

export function rotateArray(arr: number[], times: number): number[] {

  if (!isPerfectSquare(arr.length)) {
    return [];
  }

  const n = Math.sqrt(arr.length);
  const matrix: number[][] = [];

  for (let i = 0; i < n; i++) {
    matrix.push(arr.slice(i * n, (i + 1) * n));
  }

  const rotated = rotateMatrix(matrix, times);
  return rotated.flat();
}

export function isPerfectSquare(n: number): boolean {
  const sqrt = Math.sqrt(n);
  return Number.isInteger(sqrt) && sqrt > 0;
}