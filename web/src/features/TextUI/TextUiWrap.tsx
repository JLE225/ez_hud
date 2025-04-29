import React, { useState, useEffect } from "react";
import { TextUiProps } from "../dev/types/textuiTypes";
import { useNuiEvent } from "../../hooks/useNuiEvent";

// Fungsi untuk membuat animasi custom seperti di NotifyWrap
const getAnimation = (visible: boolean, id: string): string => {
  const animationName = `fade-textui-${id}-${visible ? "enter" : "leave"}`;
  const animationOptions = visible
    ? "0.25s ease-out forwards"
    : "0.25s ease-in forwards";

  const keyframes = `@keyframes ${animationName} {
    from {
      opacity: ${visible ? 0 : 1};
    }
    to {
      opacity: ${visible ? 1 : 0};
    }
  }`;

  if (!document.getElementById(animationName)) {
    const style = document.createElement("style");
    style.id = animationName;
    style.innerHTML = keyframes;
    document.head.appendChild(style);
  }

  return `${animationName} ${animationOptions}`;
};

const TextUiWrap = () => {
  const [data, setData] = useState<TextUiProps>({
    keybind: "",
    text: "",
    position: "right",
  });
  const [visible, setVisible] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);
  const [animId] = useState(`textui-${Math.random().toString(36).substring(2, 9)}`);

  // Handle visibility changes with animations
  useEffect(() => {
    if (visible) {
      setAnimationVisible(true);
    } else {
      // Delay hiding until animation completes
      const timer = setTimeout(() => {
        setAnimationVisible(false);
      }, 250); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [visible]);

  useNuiEvent<TextUiProps>("textUi", (data) => {
    if (!data.position) data.position = "right";
    setData(data);
    setVisible(true);
  });

  useNuiEvent("textUiHide", () => setVisible(false));

  if (!animationVisible && !visible) return null;

  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const accentColor = "#38f396";

  const KeybindBox = ({ keybind }: { keybind: string }) => (
    <div 
      className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#1f2937] border border-[#38f396] shadow-lg"
      style={{
        boxShadow: `0 4px 12px rgba(0, 0, 0, 0.15), 0 0 8px ${hexToRgba(accentColor, 0.3)}`
      }}
    >
      <div
        className="w-full h-full flex items-center justify-center rounded-md"
        style={{
          background:
            "radial-gradient(circle at center, rgba(56, 243, 150, 0.2) 0%, rgba(56, 243, 150, 0.2) 50%, rgba(56, 243, 150, 0.4) 100%)",
        }}
      >
        <p 
          className="text-white font-bold text-lg"
          style={{
            textShadow: `0 0 10px ${hexToRgba(accentColor, 0.7)}`
          }}
        >
          {keybind}
        </p>
      </div>
    </div>
  );

  const TextBox = ({ text }: { text: string }) => (
    <div 
      className="h-12 max-w-72 rounded-lg bg-[#1f2937] border border-[#38f396] shadow-lg flex items-center justify-start relative overflow-hidden"
      style={{
        boxShadow: `0 4px 12px rgba(0, 0, 0, 0.15), 0 0 8px ${hexToRgba(accentColor, 0.3)}`
      }}
    >
      <div
        className="w-full h-full flex items-center justify-center rounded-md px-4"
        style={{
          background:
            "radial-gradient(circle at center, rgba(56, 243, 150, 0.1) 0%, rgba(56, 243, 150, 0.1) 50%, rgba(56, 243, 150, 0.2) 100%)",
        }}
      >
        <div className="absolute top-0 left-0 h-1 w-1 rounded-full bg-[#38f396] mt-1.5 ml-1.5 animate-pulse"></div>
        <p 
          className="text-white text-lg"
          style={{
            textShadow: `0 0 15px ${hexToRgba(accentColor, 0.4)}`
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full absolute flex items-center justify-between px-4">
      {data.position === "left" && (
        <div 
          className="flex items-center gap-2" 
          style={{
            ...data.style,
            animation: getAnimation(visible, `${animId}-left`),
          }}
        >
          {data.keybind && <KeybindBox keybind={data.keybind} />}
          <TextBox text={data.text} />
        </div>
      )}

      {data.position === "right" && (
        <div 
          className="flex items-center ml-auto gap-2" 
          style={{
            ...data.style,
            animation: getAnimation(visible, `${animId}-right`),
          }}
        >
          {data.keybind && <KeybindBox keybind={data.keybind} />}
          <TextBox text={data.text} />
        </div>
      )}
    </div>
  );
};

export default TextUiWrap;