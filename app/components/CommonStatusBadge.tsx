"use client";

import React from "react";

type StatusTone = "danger" | "warning" | "success" | "info" | "neutral";
type StatusVariant = "outline" | "solid" | "text";

interface CommonStatusBadgeProps {
  label?: string;
  tone?: StatusTone;
  variant?: StatusVariant;
  className?: string;
}

const toneColors: Record<
  StatusTone,
  { dot: string; text: string; border: string; bg: string }
> = {
  danger: {
    dot: "bg-red-500",
    text: "text-red-600",
    border: "border-red-300",
    bg: "bg-red-100",
  },
  warning: {
    dot: "bg-amber-500",
    text: "text-amber-600",
    border: "border-amber-300",
    bg: "bg-amber-100",
  },
  success: {
    dot: "bg-green-500",
    text: "text-green-600",
    border: "border-green-300",
    bg: "bg-green-100",
  },
  info: {
    dot: "bg-blue-500",
    text: "text-blue-600",
    border: "border-blue-300",
    bg: "bg-blue-100",
  },
  neutral: {
    dot: "bg-gray-500",
    text: "text-gray-600",
    border: "border-gray-300",
    bg: "bg-gray-100",
  },
};

export default function CommonStatusBadge({
  label = "Status",
  tone = "danger",
  variant = "outline",
  className = "",
}: CommonStatusBadgeProps) {
  const toneStyle = toneColors[tone];

  const base = "inline-flex items-center gap-2 text-xs font-semibold";

  if (variant === "text") {
    return (
      <span className={`${base} ${toneStyle.text} ${className}`}>
        <span className={`w-2 h-2 rounded-full ${toneStyle.dot}`} />
        {label}
      </span>
    );
  }

  if (variant === "solid") {
    return (
      <span
        className={`${base} ${toneStyle.text} ${toneStyle.bg} ${toneStyle.border} border px-3 py-1 rounded-full ${className}`}
      >
        <span className={`w-2 h-2 rounded-full ${toneStyle.dot}`} />
        {label}
      </span>
    );
  }

  // outline
  return (
    <span
      className={`${base} ${toneStyle.text} bg-white ${toneStyle.border} border px-3 py-1 rounded-full ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${toneStyle.dot}`} />
      {label}
    </span>
  );
}

