"use client";

import React from "react";

type BannerTone = "info" | "warning" | "success" | "danger" | "neutral";

interface CommonBannerProps {
  title?: string;
  description?: string;
  tone?: BannerTone;
  bordered?: boolean;
  withIcon?: boolean;
  className?: string;
}

const toneStyles: Record<
  BannerTone,
  { bg: string; text: string; border: string; icon: JSX.Element }
> = {
  neutral: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-200",
    icon: (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  info: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200",
    icon: (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  success: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
    icon: (
      <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  warning: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    border: "border-amber-200",
    icon: (
      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01M10.29 3.86l-7 12A1 1 0 004.18 17h13.64a1 1 0 00.86-1.5l-7-12a1 1 0 00-1.72 0z"
        />
      </svg>
    ),
  },
  danger: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-200",
    icon: (
      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2 2 2m-2-2V8m0 8h.01" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
};

export default function CommonBanner({
  title,
  description,
  tone = "neutral",
  bordered = false,
  withIcon = true,
  className = "",
}: CommonBannerProps) {
  const toneStyle = toneStyles[tone];
  return (
    <div
      className={`w-full ${toneStyle.bg} ${toneStyle.text} ${
        bordered ? `border ${toneStyle.border}` : ""
      } rounded-md px-4 py-3 flex items-start gap-3 ${className}`}
    >
      {withIcon && <div className="mt-0.5">{toneStyle.icon}</div>}
      <div className="flex flex-col gap-0.5">
        {title && <div className="text-sm font-semibold">{title}</div>}
        {description && <div className="text-xs text-current">{description}</div>}
      </div>
    </div>
  );
}

