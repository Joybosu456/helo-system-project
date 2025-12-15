import React from "react";

type ButtonVariant = "filled" | "outline" | "text";
type ButtonColor = "primary" | "secondary" | "danger" | "dark" | "light" | "gray";
type ButtonSize = "sm" | "md" | "lg";

interface CommonButtonProps {
    children: React.ReactNode;
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    id?: string;
    name?: string;
}

export default function CommonButton({
    children,
    variant = "filled",
    color = "primary",
    size = "md",
    disabled = false,
    onClick,
    type = "button",
    className = "",
    id,
    name,
}: CommonButtonProps) {
    const sizeClasses: Record<ButtonSize, string> = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const getColorClasses = (): string => {
        if (variant === "filled") {
            const filledClasses: Record<ButtonColor, string> = {
                primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
                secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
                danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
                dark: "bg-gray-900 text-white hover:bg-black focus:ring-gray-900",
                light: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
                gray: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
            };
            return filledClasses[color];
        }

        if (variant === "outline") {
            const outlineClasses: Record<ButtonColor, string> = {
                primary: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500",
                secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
                danger: "bg-white text-red-600 border border-red-600 hover:bg-red-50 focus:ring-red-500",
                dark: "bg-white text-gray-900 border border-gray-900 hover:bg-gray-50 focus:ring-gray-900",
                light: "bg-gray-50 text-gray-700 border border-gray-300 hover:bg-gray-100 focus:ring-gray-400",
                gray: "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 focus:ring-gray-500",
            };
            return outlineClasses[color];
        }

        const textClasses: Record<ButtonColor, string> = {
            primary: "bg-white text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
            secondary: "bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
            danger: "bg-white text-red-600 hover:bg-red-50 focus:ring-red-500",
            dark: "bg-white text-gray-900 hover:bg-gray-100 focus:ring-gray-900",
            light: "bg-white text-gray-600 hover:bg-gray-100 focus:ring-gray-400",
            gray: "bg-white text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
        };
        return textClasses[color];
    };

    const colorClasses = getColorClasses();
    const sizeClass = sizeClasses[size];

    return (
        <button
            id={id}
            name={name}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${sizeClass} ${colorClasses} ${className}`}
        >
            {children}
        </button>
    );
}

