import React, { useEffect, useState } from "react";
import { useNuiEvent } from "../../hooks/useNuiEvent";

interface CircleProgressbarProps {
  label?: string;
  duration: number;
}

const CircleProgbarWrap: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("Processing");
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(0);

  useNuiEvent("circleProgressCancel", () => setVisible(false));

  useNuiEvent<CircleProgressbarProps>("circleProgress", (data) => {
    setVisible(true);
    setLabel(data.label || "Processing");
    setDuration(data.duration);
    setProgress(0);
    setCountdown(data.duration / 1000);
  });

  useEffect(() => {
    if (!visible || duration <= 0) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = ((duration - remaining) / duration) * 100;
      const newCountdown = Math.ceil(remaining / 1000);

      setProgress(Math.min(100, newProgress));
      setCountdown(newCountdown);

      if (remaining <= 0) {
        clearInterval(interval);
        setVisible(false);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [visible, duration]);

  if (!visible) return null;

  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative flex items-center justify-center flex-col">
        {/* Outer circle container */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* SVG Circle */}
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#2D3748"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#00F1B3"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              fill="transparent"
              className="transition-all duration-100 ease-linear"
            />
          </svg>

          {/* Center content */}
          <div className="absolute flex flex-col items-center justify-center">
            {/* Countdown timer */}
            <div className="text-2xl font-bold text-white">
              {countdown}s
            </div>
          </div>
        </div>

        {/* Label Text Below Progress Bar */}
        <div className="text-md text-gray-300 text-center truncate absolute -bottom-2">
          {label}
        </div>
      </div>
    </div>
  );
};

export default CircleProgbarWrap;
