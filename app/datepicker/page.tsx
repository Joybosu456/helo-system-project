"use client";

import CommonDatePicker from "../components/CommonDatePicker";

export default function DatePickerPage() {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Date Picker</h2>

      <div className="flex flex-wrap gap-6">
        <CommonDatePicker collapsible autoCloseOnSelect label="Date picker" className="min-w-[250px]" />

        <CommonDatePicker collapsible autoCloseOnSelect borderedHighlight label="Date picker (bordered)" className="min-w-[250px]" />

        <CommonDatePicker compact showSidebarMonths className="min-w-[250px]" />

        <CommonDatePicker withTime className="min-w-[320px]" />
      </div>
    </div>
  );
}

