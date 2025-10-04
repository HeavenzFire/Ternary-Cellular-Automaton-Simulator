import type { CellState } from './types';

export const DEFAULT_WIDTH: number = 81;
export const DEFAULT_STEPS: number = 100;

export const CELL_COLORS: Record<CellState, string> = {
  0: 'bg-gray-800', // Matches user prompt: 0 -> RGBColor[0.9, 0.9, 0.9] (light gray), but dark mode looks better
  1: 'bg-cyan-400',   // Matches user prompt: 1 -> RGBColor[0.2, 0.2, 0.2] (dark gray/black)
  2: 'bg-fuchsia-500', // Matches user prompt: 2 -> RGBColor[0.5, 0.5, 0.5] (medium gray)
};

export const FIB_SEQUENCE: number[] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];