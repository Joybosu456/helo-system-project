"use client";
import { useState } from "react";

interface SliderProps {
    min?: number;
    max?: number;
    disabled?: boolean;
    showValue?: boolean;
}

export default function Slider({
    min = 0,
    max = 100,
    disabled = false,
    showValue = true,
}: SliderProps) {
    const [value, setValue] = useState(50);

    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="w-full max-w-sm space-y-3">
            {/* Tooltip */}
            {showValue && !disabled && (
                <div className="relative h-6">
                    <div
                        className="absolute -top-8 -translate-x-1/2"
                        style={{ left: `${percentage}%` }}
                    >
                        <span className="rounded bg-black px-2 py-1 text-xs text-white">
                            {value}
                        </span>
                    </div>
                </div>
            )}

            <input
                type="range"
                min={min}
                max={max}
                value={value}
                disabled={disabled}
                onChange={(e) => setValue(Number(e.target.value))}
                className="slider w-full appearance-none"
                style={{
                    background: disabled
                        ? "#E5E7EB"
                        : `linear-gradient(to right, #3B82F6 ${percentage}%, #E5E7EB ${percentage}%)`,
                }}
            />

            <style jsx>{`
        .slider {
          height: 4px;
          border-radius: 9999px;
          outline: none;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          border: 2px solid ${disabled ? "#9CA3AF" : "#3B82F6"};
          cursor: ${disabled ? "not-allowed" : "pointer"};
          margin-top: -6px;
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          border: 2px solid ${disabled ? "#9CA3AF" : "#3B82F6"};
          cursor: ${disabled ? "not-allowed" : "pointer"};
        }
      `}</style>
        </div>
    );
}
