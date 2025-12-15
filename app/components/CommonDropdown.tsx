"use client";

import React, { useEffect, useRef, useState } from "react";

type DropdownState = "default" | "success" | "error" | "disabled";

interface Option {
  value: string;
  label: string;
}

interface CommonDropdownProps {
  label?: string;
  placeholder?: string;
  value?: string; // single
  onChange?: (value: string) => void;
  selected?: string[]; // multi
  onChangeSelected?: (selected: string[]) => void;
  state?: DropdownState;
  message?: string;
  id?: string;
  name?: string;
  darkPlaceholder?: boolean;
  multiple?: boolean;
  options?: Option[];
}

export default function CommonDropdown({
  label,
  placeholder = "Select",
  value,
  onChange,
  selected = [],
  onChangeSelected,
  state = "default",
  message,
  id,
  name,
  darkPlaceholder = false,
  multiple = false,
  options = [],
}: CommonDropdownProps) {
  const generatedId = React.useId();
  const inputId = id || name || generatedId;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const base = "w-full text-sm px-3 py-2 rounded-lg border transition-colors outline-none shadow-sm flex items-center gap-2";

  const stateClasses: Record<DropdownState, string> = {
    default: "bg-white border-gray-300",
    success: "bg-white border-green-400",
    error: "bg-white border-red-400",
    disabled: "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed",
  };

  const placeholderClass = darkPlaceholder ? "text-gray-700" : "text-gray-400";

  const isSelected = (val: string) => selected.includes(val);

  function toggleOption(opt: Option) {
    if (multiple) {
      const next = isSelected(opt.value) ? selected.filter((s) => s !== opt.value) : [...selected, opt.value];
      onChangeSelected?.(next);
    } else {
      onChange?.(opt.value);
      setOpen(false);
    }
  }

  function removeTag(val: string) {
    const next = selected.filter((s) => s !== val);
    onChangeSelected?.(next);
  }

  const displayText = () => {
    if (multiple) {
      if (!selected || selected.length === 0) return placeholder;
      const labels = selected
        .map((s) => options.find((o) => o.value === s)?.label || s)
        .filter(Boolean)
        .slice(0, 3);
      return labels.join(", ") + (selected.length > 3 ? ` +${selected.length - 3}` : "");
    }
    if (value) return options.find((o) => o.value === value)?.label || value;
    return placeholder;
  };

  return (
    <div className="mb-5">
      {label && (
        <label htmlFor={inputId} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative" ref={ref}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          id={inputId}
          className={`${base} ${stateClasses[state]} justify-between py-2`}
          onClick={() => state !== "disabled" && setOpen((s) => !s)}
        >
          <div className="flex-1 flex flex-wrap items-center gap-2">
            {multiple && selected && selected.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selected.map((s) => {
                  const labelText = options.find((o) => o.value === s)?.label || s;
                  return (
                    <span key={s} className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs border">
                      <span>{labelText}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (state !== "disabled") removeTag(s);
                        }}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label={`Remove ${labelText}`}
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            ) : (
              <span className={`${value || (selected && selected.length > 0) ? "text-gray-900" : placeholderClass}`}>{displayText()}</span>
            )}
          </div>

          <svg className={`w-4 h-4 text-gray-500 ml-2 ${open ? "transform rotate-180" : ""}`} viewBox="0 0 20 20" fill="none">
            <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && state !== "disabled" && (
          <ul className="absolute z-40 w-full mt-1 max-h-56 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg py-1">
            {options.length === 0 && <li className="px-3 py-2 text-sm text-gray-500">No options</li>}
            {options.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={multiple ? isSelected(opt.value) : value === opt.value}
                className={`px-3 py-2 text-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 ${
                  multiple && isSelected(opt.value) ? "bg-gray-100" : ""
                }`}
                onClick={() => toggleOption(opt)}
              >
                <span className="truncate">{opt.label}</span>
                {multiple ? (isSelected(opt.value) ? <span className="text-green-600">✓</span> : null) : value === opt.value ? <span className="text-green-600">✓</span> : null}
              </li>
            ))}
          </ul>
        )}
      </div>

      {message && (
        <div className="mt-2 flex items-center text-sm">
          <span className={`mr-2 ${state === "error" ? "text-red-600" : "text-green-600"}`}>
            {state === "error" ? (
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.593c.75 1.334-.213 2.998-1.742 2.998H3.48c-1.53 0-2.493-1.664-1.742-2.998L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-.993.883L9 6v4a1 1 0 001.993.117L11 10V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 103.293 9.293l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
              </svg>
            )}
          </span>
          <span className={`${state === "error" ? "text-red-700" : "text-green-700"}`}>{message}</span>
        </div>
      )}
    </div>
  );
}
