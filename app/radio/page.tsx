"use client";

import { useState } from "react";
import CommonRadioMenu from "../components/CommonRadioMenu";

const sampleOptions = [
  { value: "1", label: "Radiobutton" },
  { value: "2", label: "Radiobutton" },
  { value: "3", label: "Radiobutton" },
  { value: "4", label: "Radiobutton" },
  { value: "5", label: "Radiobutton" },
];

export default function RadioPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedLabel = selected ? sampleOptions.find((o) => o.value === selected)?.label ?? selected : null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Radiobutton Menu (Template)</h2>
      <p className="text-sm text-gray-600 mb-6">Applied: {selectedLabel ?? "None"}</p>

      <CommonRadioMenu
        title="Radiobutton Menu (Template)"
        options={sampleOptions}
        onApply={(val) => setSelected(val)}
        onReset={() => setSelected(null)}
      />

      <div className="mt-4 text-sm text-gray-700">
        Current applied value: <span className="font-medium">{selectedLabel ?? "None"}</span>
      </div>
    </div>
  );
}

