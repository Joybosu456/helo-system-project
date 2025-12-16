"use client";

import React, { useMemo, useState } from "react";

type PickerMode = "single" | "range";

interface CommonDatePickerProps {
  mode?: PickerMode;
  initialMonth?: number; // 0-11
  initialYear?: number;
  className?: string;
  borderedHighlight?: boolean;
  compact?: boolean;
  showSidebarMonths?: boolean;
  withTime?: boolean;
  onChange?: (value: Date | [Date | null, Date | null]) => void;
  onSave?: (value: { date: Date | [Date | null, Date | null]; time?: { hour: number; minute: number; ampm: "AM" | "PM" } }) => void;
  onReset?: () => void;
  collapsible?: boolean;
  autoCloseOnSelect?: boolean;
  label?: string;
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekdayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function toDateParts(date: Date | null) {
  if (!date) return null;
  return { y: date.getFullYear(), m: date.getMonth(), d: date.getDate() };
}

function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function CommonDatePicker({
  mode = "range",
  initialMonth = new Date().getMonth(),
  initialYear = new Date().getFullYear(),
  className = "",
  borderedHighlight = false,
  compact = false,
  showSidebarMonths = false,
  withTime = false,
  onChange,
  onSave,
  onReset,
  collapsible = false,
  autoCloseOnSelect = false,
  label,
}: CommonDatePickerProps) {
  const [month, setMonth] = useState(initialMonth);
  const [year, setYear] = useState(initialYear);
  const [startDate, setStartDate] = useState<Date | null>(new Date(year, month, 15));
  const [endDate, setEndDate] = useState<Date | null>(mode === "range" ? new Date(year, month, 19) : null);
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(5);
  const [ampm, setAmpm] = useState<"AM" | "PM">("AM");
  const [open, setOpen] = useState(!collapsible);

  const monthDays = useMemo(() => {
    const total = daysInMonth(year, month);
    const firstWeekday = new Date(year, month, 1).getDay(); // 0=Sun
    return { total, firstWeekday };
  }, [month, year]);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const clicked = new Date(year, month, day);
    if (mode === "single") {
      setStartDate(clicked);
      setEndDate(null);
      onChange?.(clicked);
      if (collapsible && autoCloseOnSelect) setOpen(false);
      return;
    }

    // range selection
    if (!startDate || (startDate && endDate)) {
      setStartDate(clicked);
      setEndDate(null);
      onChange?.([clicked, null]);
      return;
    }
    if (startDate && !endDate) {
      if (clicked < startDate) {
        setEndDate(startDate);
        setStartDate(clicked);
        onChange?.([clicked, startDate]);
      } else {
        setEndDate(clicked);
        onChange?.([startDate, clicked]);
      }
    }

    if (mode === "range" && startDate && !endDate && collapsible && autoCloseOnSelect) {
      // close only after end is selected (the branch above sets it)
      if (clicked >= startDate) setOpen(false);
      if (clicked < startDate) setOpen(false);
    }
  };

  const reset = () => {
    setStartDate(null);
    setEndDate(null);
    setHour(1);
    setMinute(5);
    setAmpm("AM");
    onReset?.();
  };

  const save = () => {
    const value = mode === "single" ? (startDate ?? null) : ([startDate, endDate] as [Date | null, Date | null]);
    onSave?.({
      date: value,
      time: withTime ? { hour, minute, ampm } : undefined,
    });
  };

  const inRange = (day: number) => {
    if (mode === "single") return false;
    if (!startDate || !endDate) return false;
    const current = new Date(year, month, day);
    return current >= startDate && current <= endDate;
  };

  const isSelected = (day: number) => {
    const current = new Date(year, month, day);
    return isSameDay(current, startDate) || isSameDay(current, endDate);
  };

  const renderDayCells = () => {
    const cells: JSX.Element[] = [];
    for (let i = 0; i < monthDays.firstWeekday; i += 1) {
      cells.push(<div key={`empty-${i}`} />);
    }
    for (let d = 1; d <= monthDays.total; d += 1) {
      const selected = isSelected(d);
      const ranged = inRange(d);
      const isToday = isSameDay(new Date(year, month, d), new Date());
      const base =
        "flex items-center justify-center w-9 h-9 rounded-full text-sm cursor-pointer transition-colors";
      const classNames = [
        base,
        ranged ? "bg-blue-100 text-blue-700" : "text-gray-700",
        selected ? "bg-blue-500 text-white" : "",
        !selected && !ranged ? "hover:bg-gray-100" : "",
        isToday && !selected ? "ring-1 ring-blue-300" : "",
      ]
        .filter(Boolean)
        .join(" ");
      cells.push(
        <button key={`day-${d}`} type="button" onClick={() => handleSelectDay(d)} className={classNames}>
          {d}
        </button>
      );
    }
    return cells;
  };

  const containerBase = compact ? "w-[240px]" : "w-[260px]";

  const formatDate = (d: Date | null) => {
    if (!d) return "";
    return `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  const selectionText =
    mode === "single"
      ? formatDate(startDate) || "Select date"
      : startDate && endDate
        ? `${formatDate(startDate)} - ${formatDate(endDate)}`
        : startDate
          ? `${formatDate(startDate)} - ...`
          : "Select date range";

  const calendarCard = (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm p-3 ${containerBase} ${
        borderedHighlight ? "outline outline-2 outline-purple-400" : ""
      } ${className}`}
    >
      <header className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50"
            aria-label="Previous month"
          >
            <span className="text-gray-600 text-sm">‹</span>
          </button>
          <div className="text-sm font-medium text-gray-800">
            {monthNames[month]} {year}
          </div>
        </div>
        <button
          type="button"
          onClick={handleNextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50"
          aria-label="Next month"
        >
          <span className="text-gray-600 text-sm">›</span>
        </button>
      </header>

      <div className="flex gap-2">
        {/* Calendar grid */}
        <div className="flex-1">
          <div className="grid grid-cols-7 text-[11px] text-gray-500 mb-2">
            {weekdayNames.map((w) => (
              <div key={w} className="text-center">
                {w}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">{renderDayCells()}</div>
        </div>

        {/* Sidebar months (optional) */}
        {showSidebarMonths && (
          <div className="w-14 flex flex-col gap-2 text-center">
            {monthNames.map((m, idx) => {
              const active = idx === month;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMonth(idx)}
                  className={`text-[11px] px-2 py-1 rounded-md border ${
                    active ? "bg-blue-500 text-white border-blue-500" : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        )}

        {/* Time picker (optional) */}
        {withTime && (
          <div className="w-24 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="text-[11px] text-gray-500 font-medium">Hour</div>
              <div className="flex gap-1 flex-wrap">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHour(h)}
                    className={`w-9 h-7 rounded-md border text-xs ${
                      hour === h ? "bg-blue-500 text-white border-blue-500" : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {h.toString().padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[11px] text-gray-500 font-medium">Minute</div>
              <div className="flex gap-1 flex-wrap">
                {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMinute(m)}
                    className={`w-9 h-7 rounded-md border text-xs ${
                      minute === m ? "bg-blue-500 text-white border-blue-500" : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {m.toString().padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              {(["AM", "PM"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAmpm(p)}
                  className={`flex-1 h-7 rounded-md border text-xs ${
                    ampm === p ? "bg-blue-500 text-white border-blue-500" : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-3">
        <button
          type="button"
          onClick={reset}
          className="px-3 py-1.5 text-xs rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={save}
          className="px-3 py-1.5 text-xs rounded-md bg-gray-900 text-white hover:bg-black"
        >
          Save
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-2">
      {label && <div className="text-sm font-medium text-gray-700">{label}</div>}

      {collapsible ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <span className="text-gray-700">{selectionText}</span>
            <span className="text-gray-500 text-xs">{open ? "▲" : "▼"}</span>
          </button>

          {open && (
            <div className="absolute z-40 mt-2">
              {calendarCard}
            </div>
          )}
        </div>
      ) : (
        calendarCard
      )}
    </div>
  );
}

