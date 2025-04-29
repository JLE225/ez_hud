import React, { useState } from "react";
import { useNuiEvent } from "../../hooks/useNuiEvent";
import { NotifyProps } from "../dev/types/notifyTypes";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import LibIcon from "../../components/LibIcon";

const getAnimation = (visible: boolean, _position: string, id: string): string => {
  const animationName = `fade-toast-${id}-${visible ? "enter" : "leave"}`;
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


const NotifyWrap: React.FC = () => {
  const [toastKey, setToastKey] = useState(0);

  useNuiEvent<NotifyProps>("notify", (data) => {
    if (!data.title && !data.message) return;

    const toastId = data.id?.toString();
    const duration = data.duration || 5000;

    let iconColor: string;
    let position = data.position || "top-right";

    const hexToRgba = (hex: string, alpha: number): string => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    if (toastId) setToastKey((prevKey) => prevKey + 1);

    if (!data.icon) {
      switch (data.type) {
        case "success":
          data.icon = "check";
          break;
        case "error":
          data.icon = "xmark";
          break;
        case "transaction":
          data.icon = "money-bill-wave";
          break;
        default:
          data.icon = "bell";
      }
    }

    if (!data.iconColor) {
      switch (data.type) {
        case "success":
          iconColor = "#10B981";
          break;
        case "error":
          iconColor = "#EF4444";
          break;
        case "transaction":
          iconColor = "#34D399";
          break;
        default:
          iconColor = "#EAB308";
          break;
      }
    } else {
      iconColor = data.iconColor;
    }

    toast.custom(
      (t) => (
        <div
          className="w-[300px] rounded-lg overflow-hidden bg-slate-900"
          style={{
            animation: getAnimation(t.visible, position, toastId ?? "default"),
            boxShadow: `0 4px 12px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.1), 0 0 8px ${hexToRgba(iconColor, 0.3)}`,
          }}
        >
          <div
            style={{
              background: `linear-gradient(to right, ${hexToRgba(iconColor, 0.5)}, ${hexToRgba(iconColor, 0.1)})`,
              borderLeft: `3px solid ${iconColor}`,
              backdropFilter: "blur(8px)",
            }}
            className="w-full h-full rounded-lg p-3 flex space-x-3 relative items-center bg-[#1E293B]"
          >
            {/* Icon Wrapper */}
            <div 
              className="flex items-center justify-center min-w-[36px] min-h-[36px] rounded-full bg-black bg-opacity-20"
              style={{
                boxShadow: `0 0 10px ${hexToRgba(iconColor, 0.5)}, 0 0 5px ${hexToRgba(iconColor, 0.3)} inset`,
              }}
            >
              <LibIcon
                icon={data.icon!}
                fixedWidth
                style={{
                  width: "20px",
                  height: "20px",
                  color: iconColor,
                  filter: `drop-shadow(0 0 3px ${hexToRgba(iconColor, 0.8)})`,
                }}
              />
            </div>

            <div className="text-white flex-1">
              {data.title && (
                <p 
                  className="font-bold leading-tight mb-1"
                  style={{
                    textShadow: `0 0 15px ${hexToRgba(iconColor, 0.5)}`,
                  }}
                >
                  {data.title}
                </p>
              )}
              <p
                className={`${
                  !data.title
                    ? "text-sm leading-snug"
                    : "text-sm leading-snug"
                } text-zinc-200`}
              >
                {data.message}
              </p>
            </div>
          </div>
        </div>
      ),
      {
        id: toastId,
        duration,
        position: position as any,
      }
    );
  });

  return <Toaster />;
};

export default NotifyWrap;