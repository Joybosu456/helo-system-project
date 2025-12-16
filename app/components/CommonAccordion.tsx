"use client";

import React, { useState } from "react";

export interface AccordionItem {
  id: string;
  title: string;
  description?: string;
  content?: React.ReactNode;
  defaultOpen?: boolean;
  switchable?: boolean;
  switchOn?: boolean;
  onToggleSwitch?: (checked: boolean) => void;
}

interface CommonAccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
  variant?: "plain" | "card";
}

export default function CommonAccordion({
  items,
  allowMultiple = true,
  className = "",
  variant = "plain",
}: CommonAccordionProps) {
  const [openIds, setOpenIds] = useState(() =>
    items.filter((i) => i.defaultOpen).map((i) => i.id)
  );

  const isOpen = (id: string) => openIds.includes(id);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      if (allowMultiple) {
        return prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      }
      return prev.includes(id) ? [] : [id];
    });
  };

  const toggleSwitch = (item: AccordionItem) => {
    item.onToggleSwitch?.(!item.switchOn);
  };

  const cardClass =
    variant === "card"
      ? "rounded-xl border border-gray-200 shadow-sm bg-white"
      : "";

  return (
    <div className={`divide-y divide-gray-100 ${cardClass} ${className}`}>
      {items.map((item) => {
        const open = isOpen(item.id);
        return (
          <div key={item.id} className="px-4 py-3">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between gap-3 text-left"
            >
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">
                  {item.title}
                </span>
                {item.description && (
                  <span className="text-xs text-gray-500">{item.description}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {item.switchable && (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={!!item.switchOn}
                      onChange={() => toggleSwitch(item)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition peer-checked:translate-x-5"></div>
                  </label>
                )}
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M6 8l4 4 4-4"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            {open && item.content && (
              <div className="mt-2 text-sm text-gray-700">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

