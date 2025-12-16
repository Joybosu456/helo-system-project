"use client";

import { useState } from "react";
import CommonSearchInput from "../components/CommonSearchInput";

export default function SearchPage() {
  const [defaultValue, setDefaultValue] = useState("");
  const [hoverValue, setHoverValue] = useState("");
  const [defaultValue2, setDefaultValue2] = useState("");
  const [focusedValue, setFocusedValue] = useState("");
  const [disabledValue, setDisabledValue] = useState("");

  const [defaultWithClear, setDefaultWithClear] = useState("");
  const [hoverWithClear, setHoverWithClear] = useState("");
  const [defaultWithClear2, setDefaultWithClear2] = useState("");
  const [focusedWithClear, setFocusedWithClear] = useState("");
  const [disabledWithClear, setDisabledWithClear] = useState("");

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-8">Search Input Components</h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column - Without Clear Button */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Default State</h3>
            <CommonSearchInput
              placeholder="Search"
              value={defaultValue}
              onChange={(e) => setDefaultValue(e.target.value)}
              state="default"
              showClearButton={false}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Hover State</h3>
            <CommonSearchInput
              placeholder="Search"
              value={hoverValue}
              onChange={(e) => setHoverValue(e.target.value)}
              state="hover"
              showClearButton={false}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Default State</h3>
            <CommonSearchInput
              placeholder="Search"
              value={defaultValue2}
              onChange={(e) => setDefaultValue2(e.target.value)}
              state="default"
              showClearButton={false}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Focused State</h3>
            <CommonSearchInput
              placeholder="Search"
              value={focusedValue}
              onChange={(e) => setFocusedValue(e.target.value)}
              state="focused"
              showClearButton={false}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Disabled State</h3>
            <CommonSearchInput
              placeholder="Search"
              value={disabledValue}
              onChange={(e) => setDisabledValue(e.target.value)}
              state="disabled"
              showClearButton={false}
            />
          </div>
        </div>

        {/* Right Column - With Clear Button */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Default State with Clear</h3>
            <CommonSearchInput
              placeholder="Search"
              value={defaultWithClear}
              onChange={(e) => setDefaultWithClear(e.target.value)}
              state="default"
              showClearButton={true}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Hover State with Clear</h3>
            <CommonSearchInput
              placeholder="Search"
              value={hoverWithClear}
              onChange={(e) => setHoverWithClear(e.target.value)}
              state="hover"
              showClearButton={true}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Default State with Clear</h3>
            <CommonSearchInput
              placeholder="Search"
              value={defaultWithClear2}
              onChange={(e) => setDefaultWithClear2(e.target.value)}
              state="default"
              showClearButton={true}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Focused State with Clear</h3>
            <CommonSearchInput
              placeholder="Search"
              value={focusedWithClear}
              onChange={(e) => setFocusedWithClear(e.target.value)}
              state="focused"
              showClearButton={true}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Disabled State with Clear</h3>
            <CommonSearchInput
              placeholder="Search"
              value={disabledWithClear}
              onChange={(e) => setDisabledWithClear(e.target.value)}
              state="disabled"
              showClearButton={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

