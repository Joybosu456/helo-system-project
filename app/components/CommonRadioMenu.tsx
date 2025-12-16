"use client";

import React, { useMemo, useState } from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface CommonRadioMenuProps {
  title?: string;
  options: RadioOption[];
  placeholder?: string;
  initialValue?: string | null;
  onApply?: (value: string | null) => void;
  onReset?: () => void;
  className?: string;
}

export default function CommonRadioMenu({
  title = "Radiobutton Menu",
  options,
  placeholder = "Search",
  initialValue = null,
  onApply,
  onReset,
  className = "",
}: CommonRadioMenuProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(initialValue);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const lower = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(lower));
  }, [options, query]);

  const handleReset = () => {
    setSelected(null);
    setQuery("");
    onReset?.();
  };

  const handleApply = () => {
    onApply?.(selected);
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-2xl shadow-sm p-4 w-[260px] ${className}`}>
      <div className="text-sm font-medium text-purple-700 mb-2">{title}</div>

      {/* Search box */}
      <div className="mb-3">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-4 max-h-48 overflow-auto pr-1">
        {filtered.length === 0 && <div className="text-sm text-gray-500 px-1">No options</div>}
        {filtered.map((opt) => {
          const active = selected === opt.value;
          return (
            <label key={opt.value} className="flex items-center gap-3 text-sm text-gray-800 cursor-pointer">
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  active ? "border-blue-500" : "border-gray-300"
                }`}
              >
                {active && <span className="w-2 h-2 rounded-full bg-blue-500" />}
              </span>
              <input
                type="radio"
                name="common-radio-menu"
                value={opt.value}
                checked={active}
                onChange={() => setSelected(opt.value)}
                className="sr-only"
              />
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-800 text-sm bg-white hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleApply}
          className="px-4 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-900"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

