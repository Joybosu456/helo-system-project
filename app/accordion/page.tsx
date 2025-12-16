"use client";

import { useState } from "react";
import CommonAccordion, { AccordionItem } from "../components/CommonAccordion";

export default function AccordionPage() {
  const [mainSwitch, setMainSwitch] = useState(true);
  const [itemSwitches, setItemSwitches] = useState<Record<string, boolean>>({
    a1: true,
    a2: false,
    a3: false,
    a4: false,
  });

  const leftItems: AccordionItem[] = [
    {
      id: "l1",
      title: "Accordion Title",
      description: "Description",
      defaultOpen: true,
      content: <p className="text-xs text-gray-600">Description</p>,
    },
    { id: "l2", title: "Accordion Title" },
    { id: "l3", title: "Accordion Title" },
    { id: "l4", title: "Accordion Title" },
    { id: "l5", title: "Accordion Title" },
  ];

  const permissionsList = (
    <div className="text-xs text-gray-700">
      <div className="font-semibold text-gray-700 mb-2">Permissions</div>
      <ul className="list-disc pl-5 space-y-1">
        <li>Permission 1</li>
        <li>Permission 2</li>
        <li>Permission 3</li>
        <li>Permission 4</li>
        <li>Permission 5</li>
      </ul>
    </div>
  );

  const rightItems: AccordionItem[] = [
    {
      id: "a1",
      title: "Accordion Title",
      description: "Accordion Description",
      switchable: true,
      switchOn: mainSwitch,
      onToggleSwitch: setMainSwitch,
      defaultOpen: true,
      content: permissionsList,
    },
    ...["a2", "a3", "a4", "a5"].map((id) => ({
      id,
      title: "Accordion Title",
      description: "Accordion Title",
      switchable: true,
      switchOn: itemSwitches[id] ?? false,
      onToggleSwitch: (val: boolean) =>
        setItemSwitches((prev) => ({ ...prev, [id]: val })),
    })),
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Accordion</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommonAccordion
          items={leftItems}
          allowMultiple={true}
          className="bg-white border border-gray-200 rounded-xl shadow-sm"
        />

        <CommonAccordion
          items={rightItems}
          allowMultiple={true}
          variant="card"
        />
      </div>
    </div>
  );
}

