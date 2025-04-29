import React, { useEffect, useState } from "react";
import { useNuiEvent } from "../../hooks/useNuiEvent";
import { ProgressbarProps } from "../dev/types/progbarTypes";

const ProgbarWrap: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");
  const [duration, setDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useNuiEvent("progressCancel", () => setVisible(false));

  useNuiEvent<ProgressbarProps>("progress", (data) => {
    setVisible(true);
    setLabel(data.label);
    setDuration(data.duration);
    setElapsedTime(0);
  });

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        const newElapsed = prev + 100;
        if (newElapsed >= duration) {
          clearInterval(interval);
          setVisible(false);
          return duration;
        }
        return newElapsed;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [visible, duration]);

  if (!visible) return null;

  const progressPercentage = (elapsedTime / duration) * 100;

  return (
    <div className="fixed bottom-40 left-1/2 transform -translate-x-1/2 w-80">
      <div className="w-full flex justify-between items-center mb-1 px-1">
        <p className="text-white text-sm">{label}</p>
        <p className="text-[#38f396] text-sm">
          {Math.round(progressPercentage)}%
        </p>
      </div>
      <div className="w-full p-2 border border-[#38f396]/50 rounded-md bg-[#1a2e24]/70 shadow-lg">
        <div className="w-full bg-gray-800/70 rounded-full h-2.5">
          <div
            className="bg-[#00F1B3] h-2.5 rounded-full transition-all duration-100"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgbarWrap;
