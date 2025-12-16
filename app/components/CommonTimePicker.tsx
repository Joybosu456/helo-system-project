"use client";

import React, { useState } from "react";

interface CommonTimePickerProps {
  initialHour?: number; // 1-12
  initialMinute?: number; // 0-59 in 5-step list
  initialAmPm?: "AM" | "PM";
  onChange?: (value: { hour: number; minute: number; ampm: "AM" | "PM" }) => void;
  onSave?: (value: { hour: number; minute: number; ampm: "AM" | "PM" }) => void;
  onReset?: () => void;
  className?: string;
  label?: string;
}

const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

export default function CommonTimePicker({
  initialHour = 1,
  initialMinute = 5,
  initialAmPm = "AM",
  onChange,
  onSave,
  onReset,
  className = "",
  label,
}: CommonTimePickerProps) {
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);
  const [ampm, setAmPm] = useState<"AM" | "PM">(initialAmPm);

  const commitChange = (next: { hour: number; minute: number; ampm: "AM" | "PM" }) => {
    onChange?.(next);
  };

  const handleHour = (h: number) => {
    setHour(h);
    commitChange({ hour: h, minute, ampm });
  };

  const handleMinute = (m: number) => {
    setMinute(m);
    commitChange({ hour, minute: m, ampm });
  };

  const handleAmPm = (p: "AM" | "PM") => {
    setAmPm(p);
    commitChange({ hour, minute, ampm: p });
  };

  const reset = () => {
    setHour(initialHour);
    setMinute(initialMinute);
    setAmPm(initialAmPm);
    onReset?.();
    commitChange({ hour: initialHour, minute: initialMinute, ampm: initialAmPm });
  };

  const save = () => {
    onSave?.({ hour, minute, ampm });
  };

  const pillClass = (active: boolean) =>
    `w-full flex items-center justify-center rounded-full px-4 py-2 text-sm border ${
      active ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
    }`;

  return (
    <div className={`bg-white border border-gray-200 rounded-2xl shadow-sm p-4 w-[300px] space-y-4 ${className}`}>
      {label && <div className="text-sm font-medium text-purple-700 mb-1">{label}</div>}

      {/* Selections */}
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-2">
          {hourOptions.map((h) => (
            <button key={h} type="button" onClick={() => handleHour(h)} className={pillClass(hour === h)}>
              {h.toString().padStart(2, "0")}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {minuteOptions.map((m) => (
            <button key={m} type="button" onClick={() => handleMinute(m)} className={pillClass(minute === m)}>
              {m.toString().padStart(2, "0")}
            </button>
          ))}
        </div>

        <div className="space-y-2 flex flex-col items-stretch">
          {(["AM", "PM"] as const).map((p) => (
            <button key={p} type="button" onClick={() => handleAmPm(p)} className={pillClass(ampm === p)}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-800 text-sm bg-white hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={save}
          className="px-4 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-900"
        >
          Save
        </button>
      </div>

      {/* Selected time display */}
      <div className="text-sm text-gray-600">
        Selected: {hour.toString().padStart(2, "0")}:{minute.toString().padStart(2, "0")} {ampm}
      </div>
    </div>
  );
}

