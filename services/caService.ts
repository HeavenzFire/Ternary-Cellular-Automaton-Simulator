import type { CellState } from '../types';
import { FIB_SEQUENCE } from '../constants';

/**
 * Calculates the digital root of a number.
 * @param n The number.
 * @returns The digital root (a single digit from 0-9).
 */
function digitalRoot(n: number): number {
  if (n === 0) return 0;
  return 1 + ((n - 1) % 9);
}

/**
 * Applies the custom ternary rule to a neighborhood.
 * @param neighborhood An array of three cells [left, center, right].
 * @param time The current time step (1-based).
 * @returns The next state of the center cell (0, 1, or 2).
 */
function applyRule(neighborhood: [CellState, CellState, CellState], time: number): CellState {
  const total = neighborhood.reduce((a, b) => a + b, 0);
  
  const jsIndex = (time % FIB_SEQUENCE.length === 0) 
    ? FIB_SEQUENCE.length - 1 
    : (time % FIB_SEQUENCE.length) - 1;
  const fibMod = FIB_SEQUENCE[jsIndex] % 9;

  const weighted = total * fibMod;
  const dr = digitalRoot(weighted);

  if ([3, 6, 9].includes(dr)) {
    return 2;
  }
  if ([1, 4, 7].includes(dr)) {
    return 1;
  }
  return 0;
}


/**
 * Creates the initial row for the simulation.
 * @param width The width of the grid.
 * @param randomize If true, creates a random initial state. Otherwise, a single central cell is activated.
 * @returns The first row of the grid.
 */
export function createInitialRow(width: number, randomize: boolean = false): CellState[] {
  const row: CellState[] = Array(width).fill(0);
  if (randomize) {
    for (let i = 0; i < width; i++) {
      row[i] = Math.floor(Math.random() * 3) as CellState;
    }
  } else {
    const centerIndex = Math.floor(width / 2);
    row[centerIndex] = 1;
  }
  return row;
}

/**
 * Evolves a single row of the automaton to the next state.
 * @param currentRow The current row of cell states.
 * @param time The time step (generation number) to compute.
 * @returns The next row of cell states.
 */
export function evolveRow(currentRow: CellState[], time: number): CellState[] {
  const width = currentRow.length;
  const nextRow: CellState[] = Array(width).fill(0);

  for (let i = 0; i < width; i++) {
    const left = i > 0 ? currentRow[i - 1] : 0;
    const center = currentRow[i];
    const right = i < width - 1 ? currentRow[i + 1] : 0;

    const neighborhood: [CellState, CellState, CellState] = [left, center, right];
    
    // The time step passed to the rule is 1-based, matching Mathematica's 't'
    nextRow[i] = applyRule(neighborhood, time);
  }
  return nextRow;
}