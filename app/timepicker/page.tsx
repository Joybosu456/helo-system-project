"use client";

import { useState } from "react";
import CommonTimePicker from "../components/CommonTimePicker";

export default function TimePickerPage() {
  const [picked, setPicked] = useState("01:05 AM");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Time Picker</h2>
      <p className="text-sm text-gray-600 mb-6">Selected time: {picked}</p>

      <CommonTimePicker
        label="Time Picker"
        onChange={(val) => setPicked(`${val.hour.toString().padStart(2, "0")}:${val.minute.toString().padStart(2, "0")} ${val.ampm}`)}
        onSave={(val) => setPicked(`${val.hour.toString().padStart(2, "0")}:${val.minute.toString().padStart(2, "0")} ${val.ampm}`)}
      />
    </div>
  );
}

