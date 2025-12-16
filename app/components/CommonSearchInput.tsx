"use client";

import React, { useState } from "react";

type SearchState = "default" | "hover" | "focused" | "disabled";

interface CommonSearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  state?: SearchState;
  showClearButton?: boolean;
  onClear?: () => void;
  id?: string;
  name?: string;
  className?: string;
}

export default function CommonSearchInput({
  placeholder = "Search",
  value,
  onChange,
  state = "default",
  showClearButton = false,
  onClear,
  id,
  name,
  className = "",
}: CommonSearchInputProps) {
  const generatedId = React.useId();
  const inputId = id || name || generatedId;
  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const currentValue = value !== undefined ? value : internalValue;
  const isDisabled = state === "disabled";
  const isFocusedState = state === "focused" || (isFocused && state === "default");
  const isHoveredState = state === "hover" || (isHovered && state === "default");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleClear = () => {
    if (value === undefined) {
      setInternalValue("");
    }
    onClear?.();
    // Also trigger onChange with empty value
    const event = { target: { value: "" } } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(event);
  };

  const baseClasses = "w-full text-sm pl-10 pr-4 py-2 rounded-lg border transition-colors outline-none";
  
  const stateClasses = (): string => {
    if (isDisabled) {
      return "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed";
    }
    if (isFocusedState) {
      return "bg-white border-blue-500 focus:ring-2 focus:ring-blue-100";
    }
    if (isHoveredState) {
      return "bg-white border-gray-400 hover:border-gray-400";
    }
    return "bg-white border-gray-300";
  };

  const iconColor = isDisabled ? "text-gray-400" : "text-gray-500";
  const clearButtonColor = isDisabled ? "text-gray-400" : "text-gray-700";

  return (
    <div className={`relative ${className}`}>
      {/* Search Icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input Field */}
      <input
        id={inputId}
        name={name}
        type="text"
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isDisabled}
        className={`${baseClasses} ${stateClasses()} ${showClearButton ? "pr-10" : ""}`}
      />

      {/* Clear Button */}
      {showClearButton && (
        <>
          {!isDisabled && currentValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {isDisabled && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className={`w-5 h-5 ${clearButtonColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </>
      )}
    </div>
  );
}

