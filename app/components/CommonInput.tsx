import React from "react";

type InputState = "default" | "success" | "error" | "disabled";

interface CommonInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  state?: InputState;
  message?: string;
  id?: string;
  name?: string;
  darkPlaceholder?: boolean;
}

function Icon({ type }: { type: "success" | "error" | "info" }) {
  if (type === "success") {
    return (
      <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 103.293 9.293l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
      </svg>
    );
  }

  if (type === "error") {
    return (
      <svg className="w-4 h-4 text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.593c.75 1.334-.213 2.998-1.742 2.998H3.48c-1.53 0-2.493-1.664-1.742-2.998L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-.993.883L9 6v4a1 1 0 001.993.117L11 10V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    );
  }

  return (
    <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M9 2a7 7 0 100 14A7 7 0 009 2zM8 7a1 1 0 112 0v3a1 1 0 11-2 0V7z" />
    </svg>
  );
}

export default function CommonInput({
  label,
  placeholder,
  value,
  onChange,
  state = "default",
  message,
  id,
  name,
  darkPlaceholder = false,
}: CommonInputProps) {
  const generatedId = React.useId();
  const inputId = id || name || generatedId;

  const base = "w-full text-sm px-3 py-2 rounded-lg border transition-colors outline-none shadow-sm";

  const stateClasses: Record<InputState, string> = {
    default: "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
    success: "bg-white border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-100",
    error: "bg-white border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100",
    disabled: "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed",
  };

  const showIcon = state === "success" || state === "error" || (!!message && state === "default");

  return (
    <div className="mb-5">
      {label && (
        <label htmlFor={inputId} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          name={name}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={state === "disabled"}
          className={`${base} ${stateClasses[state]} ${darkPlaceholder ? "placeholder:text-gray-700" : "placeholder:text-gray-400"}`}
        />

        {showIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {state === "success" ? <Icon type="success" /> : state === "error" ? <Icon type="error" /> : <Icon type="info" />}
          </div>
        )}
      </div>

      {message && (
        <div className="mt-2 flex items-center text-sm">
          <span className={`mr-2 ${state === "success" ? "text-green-600" : state === "error" ? "text-red-600" : "text-gray-600"}`}>
            {state === "success" ? <Icon type="success" /> : state === "error" ? <Icon type="error" /> : <Icon type="info" />}
          </span>
          <span className={`${state === "success" ? "text-green-700" : state === "error" ? "text-red-700" : "text-gray-600"}`}>
            {message}
          </span>
        </div>
      )}
    </div>
  );
}
