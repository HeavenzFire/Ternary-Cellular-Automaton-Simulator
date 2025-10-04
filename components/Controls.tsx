import React from 'react';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import ResetIcon from './icons/ResetIcon';
import SparklesIcon from './icons/SparklesIcon';

interface ControlsProps {
  width: number;
  setWidth: (value: number) => void;
  steps: number;
  setSteps: (value: number) => void;
  onStartPause: () => void;
  onReset: () => void;
  onRandomize: () => void;
  isRunning: boolean;
  generation: number;
}

const Controls: React.FC<ControlsProps> = ({
  width,
  setWidth,
  steps,
  setSteps,
  onStartPause,
  onReset,
  onRandomize,
  isRunning,
  generation,
}) => {
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };

  const handleStepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSteps(parseInt(e.target.value, 10));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
      {/* Width Slider */}
      <div className="space-y-2 md:col-span-1">
        <label htmlFor="width-slider" className="block text-sm font-medium text-cyan-300">
          Width ({width})
        </label>
        <input
          id="width-slider"
          type="range"
          min="3"
          max="201"
          step="2"
          value={width}
          onChange={handleWidthChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          disabled={isRunning}
        />
      </div>

      {/* Steps Slider */}
      <div className="space-y-2 md:col-span-1">
        <label htmlFor="steps-slider" className="block text-sm font-medium text-fuchsia-300">
          Max Steps ({steps})
        </label>
        <input
          id="steps-slider"
          type="range"
          min="1"
          max="200"
          value={steps}
          onChange={handleStepsChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-fuchsia-400"
          disabled={isRunning}
        />
      </div>

      {/* Control Buttons */}
      <div className="md:col-span-3 grid grid-cols-3 gap-4">
        <button
          onClick={onRandomize}
          disabled={isRunning}
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-200 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition-all duration-200"
          title="Randomize Initial State"
        >
          <SparklesIcon className="w-5 h-5 mr-2" />
          Randomize
        </button>
        <button
          onClick={onReset}
          disabled={isRunning}
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-200 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition-all duration-200"
          title="Reset to Initial State"
        >
          <ResetIcon className="w-5 h-5 mr-2" />
          Reset
        </button>
        <button
          onClick={onStartPause}
          className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 ${
            isRunning ? 'bg-fuchsia-500 hover:bg-fuchsia-400' : 'bg-cyan-400 hover:bg-cyan-300'
          }`}
          disabled={generation >= steps && !isRunning}
        >
          {isRunning ? (
            <>
              <PauseIcon className="w-5 h-5 mr-2" />
              Pause
            </>
          ) : (
            <>
              <PlayIcon className="w-5 h-5 mr-2" />
              {generation > 0 && generation < steps ? 'Resume' : 'Start'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Controls;