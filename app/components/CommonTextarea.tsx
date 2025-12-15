import React from "react";

type TextareaState = "default" | "error" | "disabled";

interface CommonTextareaProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    state?: TextareaState;
    message?: string;
    id?: string;
    name?: string;
    darkPlaceholder?: boolean;
    maxLength?: number;
    rows?: number;
}

function Icon({ type }: { type: "error" }) {
    if (type === "error") {
        return (
            <svg className="w-4 h-4 text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.593c.75 1.334-.213 2.998-1.742 2.998H3.48c-1.53 0-2.493-1.664-1.742-2.998L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-.993.883L9 6v4a1 1 0 001.993.117L11 10V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        );
    }

    return null;
}

export default function CommonTextarea({
    label,
    placeholder,
    value = "",
    onChange,
    state = "default",
    message,
    id,
    name,
    darkPlaceholder = false,
    maxLength = 100,
    rows = 4,
}:
    CommonTextareaProps) {
    const generatedId = React.useId();
    const inputId = id || name || generatedId;

    const base = "w-full text-sm px-3 py-2 rounded-lg border transition-colors outline-none shadow-sm resize-none";

    const stateClasses: Record<TextareaState, string> = {
        default: "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
        error: "bg-white border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100",
        disabled: "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed",
    };

    const charCount = (value || "").length;

    return (
        <div className="mb-5">
            {label && (
                <label htmlFor={inputId} className="block mb-1 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <div className="relative">
                <textarea
                    id={inputId}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={state === "disabled"}
                    maxLength={maxLength}
                    rows={rows}
                    className={`${base} ${stateClasses[state]} ${darkPlaceholder ? "placeholder:text-gray-700" : "placeholder:text-gray-400"}`}
                />

                <div className="absolute bottom-2 right-3 text-xs text-gray-500">
                    {charCount}/{maxLength}
                </div>
            </div>

            {message && (
                <div className="mt-2 flex items-center text-sm">
                    <span className="mr-2">
                        {state === "error" && <Icon type="error" />}
                    </span>
                    <span className={`${state === "error" ? "text-red-700" : "text-gray-600"}`}>
                        {message}
                    </span>
                </div>
            )}
        </div>
    );
}
