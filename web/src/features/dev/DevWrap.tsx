import React from "react";
import { notifyDebug } from "./debug/notifyDebug";
import { debugCircleProgressbar, debugProgressbar } from "./debug/progbarDebug";
import { debugTextUI } from "./debug/textuiDebug";

const DevWrap = () => {
  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 space-x-2 z-[999]">
      <button
        className="bg-gray-800 text-white rounded-lg cursor-pointer"
        onClick={() => notifyDebug()}
      >
        <div className="w-full h-full bg-[#00F1B3]/40 px-4 py-2 rounded-lg border border-[#00F1B3] hover:bg-[#00F1B3]/50 transition duration-200 ease-in-out">
          <p className="text-center">Notify</p>
        </div>
      </button>
      <button
        className="bg-gray-800 text-white rounded-lg cursor-pointer"
        onClick={() => debugTextUI()}
      >
        <div className="w-full h-full bg-[#00F1B3]/40 px-4 py-2 rounded-lg border border-[#00F1B3] hover:bg-[#00F1B3]/50 transition duration-200 ease-in-out">
          <p className="text-center">TextUI</p>
        </div>
      </button>
      <button
        className="bg-gray-800 text-white rounded-lg cursor-pointer"
        onClick={() => debugProgressbar()}
      >
        <div className="w-full h-full bg-[#00F1B3]/40 px-4 py-2 rounded-lg border border-[#00F1B3] hover:bg-[#00F1B3]/50 transition duration-200 ease-in-out">
          <p className="text-center">Progbar</p>
        </div>
      </button>
      <button
        className="bg-gray-800 text-white rounded-lg cursor-pointer"
        onClick={() => debugCircleProgressbar()}
      >
        <div className="w-full h-full bg-[#00F1B3]/40 px-4 py-2 rounded-lg border border-[#00F1B3] hover:bg-[#00F1B3]/50 transition duration-200 ease-in-out">
          <p className="text-center">Circle Progbar</p>
        </div>
      </button>
    </div>
  );
};

export default DevWrap;
