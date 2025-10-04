
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { CellState } from './types';
import { createInitialRow, evolveRow } from './services/caService';
import { DEFAULT_WIDTH, DEFAULT_STEPS } from './constants';
import Controls from './components/Controls';
import AutomatonGrid from './components/AutomatonGrid';

function App() {
  const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
  const [steps, setSteps] = useState<number>(DEFAULT_STEPS);
  const [grid, setGrid] = useState<CellState[][] | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Fix: `useRef<number>()` is invalid without an initial value. Initializing with `null`.
  const animationFrameId = useRef<number | null>(null);

  const handleReset = useCallback((randomize = false) => {
    if (width < 3 || width > 201) {
      setError('Width must be between 3 and 201.');
      return;
    }
    setError('');
    setIsRunning(false);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    const initialRow = createInitialRow(width, randomize);
    setGrid([initialRow]);
  }, [width]);

  useEffect(() => {
    handleReset(false);
  }, [width, handleReset]);

  const handleStartPause = () => {
    if (grid && grid.length >= steps) {
        setIsRunning(false);
        return;
    }
    setIsRunning(prev => !prev);
  };

  const handleRandomize = () => {
    handleReset(true);
  };

  const runAnimation = useCallback(() => {
    setGrid(prevGrid => {
      if (!prevGrid || prevGrid.length >= steps) {
        setIsRunning(false);
        return prevGrid;
      }
      const lastRow = prevGrid[prevGrid.length - 1];
      const nextRow = evolveRow(lastRow, prevGrid.length + 1);
      return [...prevGrid, nextRow];
    });
    animationFrameId.current = requestAnimationFrame(runAnimation);
  }, [steps]);

  useEffect(() => {
    if (isRunning) {
      animationFrameId.current = requestAnimationFrame(runAnimation);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isRunning, runAnimation]);

  const generation = grid ? grid.length : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 tracking-tight">
            Ternary 369 Cellular Automaton
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            A living, evolving simulation of a custom ternary rule inspired by Fibonacci sequences and digital roots.
          </p>
        </header>

        <main>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl shadow-2xl shadow-cyan-500/5 p-6 mb-8">
            <Controls
              width={width}
              setWidth={setWidth}
              steps={steps}
              setSteps={setSteps}
              onStartPause={handleStartPause}
              onReset={() => handleReset(false)}
              onRandomize={handleRandomize}
              isRunning={isRunning}
              generation={generation}
            />
            {error && <p className="text-center text-red-400 mt-4">{error}</p>}
             <div className="text-center text-gray-400 mt-4 text-sm" aria-live="polite">
                Generation: {generation} / {steps}
             </div>
          </div>

          <div className="w-full overflow-x-auto bg-gray-900 p-2 rounded-lg border border-gray-700">
             <AutomatonGrid grid={grid} />
          </div>
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Inspired by the Wolfram Language model. Implemented in React & TypeScript.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;