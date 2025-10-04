import React from 'react';
import type { CellState } from '../types';
import { CELL_COLORS } from '../constants';

interface AutomatonGridProps {
  grid: CellState[][] | null;
}

const AutomatonGrid: React.FC<AutomatonGridProps> = ({ grid }) => {
  if (!grid || grid.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Configure parameters and press Start to begin.</p>
      </div>
    );
  }

  const cellSize = 'w-2 h-2 sm:w-3 sm:h-3'; // Responsive cell size

  return (
    <div className="flex flex-col items-center p-2" style={{ imageRendering: 'pixelated' }}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-row">
          {row.map((cellState, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`${cellSize} ${CELL_COLORS[cellState]}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AutomatonGrid;