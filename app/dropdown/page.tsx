"use client";

import { useState } from "react";
import CommonDropdown from "../components/CommonDropdown";

const sampleOptions = [
  { value: "1", label: "Option One" },
  { value: "2", label: "Option Two" },
  { value: "3", label: "Option Three" },
  { value: "tag-a", label: "Tag A" },
  { value: "tag-b", label: "Tag B" },
  { value: "tag-c", label: "Tag C" },
];

export default function DropdownPage() {
  const [single, setSingle] = useState("");
  const [multi, setMulti] = useState<string[]>(["tag-a"]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Dropdowns demo</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CommonDropdown label="Label" placeholder="Select" options={sampleOptions} value={single} onChange={setSingle} state="default" />
        <CommonDropdown label="Label" placeholder="Select" options={sampleOptions} value={single} onChange={setSingle} state="default" darkPlaceholder={true} />

        <CommonDropdown label="Label" placeholder="Select" options={sampleOptions} value={single} onChange={setSingle} state="success" message={"Message"} />
        <CommonDropdown label="Label" placeholder="Select" options={sampleOptions} value={single} onChange={setSingle} state="success" message={"Message"} darkPlaceholder={true} />

        <CommonDropdown label="Label" placeholder="Select" options={sampleOptions} value={single} onChange={setSingle} state="error" message={"Message"} />
        <CommonDropdown label="Label" placeholder="Select" options={sampleOptions} value={single} onChange={setSingle} state="error" message={"Message"} darkPlaceholder={true} />

        <CommonDropdown label="Label" placeholder="Select" options={sampleOptions} value={single} onChange={setSingle} state="disabled" />
        <CommonDropdown label="Label" placeholder="Select" options={sampleOptions} value={single} onChange={setSingle} state="disabled" darkPlaceholder={true} />

        <CommonDropdown
          label="Label"
          placeholder="Select multiple tags"
          options={sampleOptions}
          multiple
          selected={multi}
          onChangeSelected={setMulti}
          state="default"
        />
        <CommonDropdown
          label="Label"
          placeholder="Select multiple tags"
          options={sampleOptions}
          multiple
          selected={multi}
          onChangeSelected={setMulti}
          state="default"
          darkPlaceholder={true}
        />

        <CommonDropdown
          label="Label"
          placeholder="Select multiple tags"
          options={sampleOptions}
          multiple
          selected={multi}
          onChangeSelected={setMulti}
          state="success"
          message="Message"
        />
        <CommonDropdown
          label="Label"
          placeholder="Select multiple tags"
          options={sampleOptions}
          multiple
          selected={multi}
          onChangeSelected={setMulti}
          state="success"
          message="Message"
          darkPlaceholder={true}
        />

        <CommonDropdown
          label="Label"
          placeholder="Select multiple tags"
          options={sampleOptions}
          multiple
          selected={multi}
          onChangeSelected={setMulti}
          state="error"
          message="Message"
        />
        <CommonDropdown
          label="Label"
          placeholder="Select multiple tags"
          options={sampleOptions}
          multiple
          selected={multi}
          onChangeSelected={setMulti}
          state="error"
          message="Message"
          darkPlaceholder={true}
        />

        <CommonDropdown
          label="Label"
          placeholder="Select multiple tags"
          options={sampleOptions}
          multiple
          selected={[]}
          onChangeSelected={() => {}}
          state="disabled"
        />
        <CommonDropdown
          label="Label"
          placeholder="Select multiple tags"
          options={sampleOptions}
          multiple
          selected={[]}
          onChangeSelected={() => {}}
          state="disabled"
          darkPlaceholder={true}
        />
      </div>
    </div>
  );
}
