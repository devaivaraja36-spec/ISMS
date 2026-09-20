import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

export const FocusTimerWidget: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(25 * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const progressPercentage = ((25 * 60 - secondsLeft) / (25 * 60)) * 100;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md text-white flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <Timer className="h-4 w-4" />
          </div>
          <h3 className="text-base font-bold text-white">Focus Timer</h3>
        </div>
        <span className="rounded-full bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 text-xs font-semibold text-purple-400">
          Pomodoro
        </span>
      </div>

      {/* Circular Ring Timer Display */}
      <div className="my-4 flex flex-col items-center justify-center">
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-slate-950 border-4 border-slate-800 shadow-inner">
          {/* Progress Ring Overlay */}
          <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-slate-800"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-purple-500 transition-all duration-1000"
              strokeWidth="6"
              strokeDasharray={2 * Math.PI * 44}
              strokeDashoffset={2 * Math.PI * 44 * (1 - progressPercentage / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          <div className="text-center z-10">
            <span className="text-3xl font-extrabold tracking-tight text-white">{formattedTime}</span>
            <p className="text-[10px] uppercase font-semibold text-slate-400 mt-0.5">Focus Mode</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={toggleTimer}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg shadow-purple-600/30 transition hover:bg-purple-500 hover:scale-105 active:scale-95"
        >
          {isActive ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
        </button>
        <button
          onClick={resetTimer}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default FocusTimerWidget;
