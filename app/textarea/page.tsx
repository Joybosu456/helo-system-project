"use client";

import { useState } from "react";
import CommonTextarea from "../components/CommonTextarea";

export default function TextareaPage() {
    const [focusValue, setFocusValue] = useState("");
    const [errorValue, setErrorValue] = useState("Placeholder text");

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CommonTextarea
                    label="Label"
                    placeholder="Placeholder text"
                    state="default"
                />
                <CommonTextarea
                    label="Label"
                    placeholder="Placeholder text"
                    state="default"
                    darkPlaceholder={true}
                />

                <CommonTextarea
                    label="Label"
                    placeholder="Placeholder text"
                    value={focusValue}
                    onChange={(e) => setFocusValue(e.target.value)}
                    state="default"
                />
                <CommonTextarea
                    label="Label"
                    placeholder="Placeholder text"
                    value={focusValue}
                    onChange={(e) => setFocusValue(e.target.value)}
                    state="default"
                    darkPlaceholder={true}
                />

                <CommonTextarea
                    label="Label"
                    placeholder="Placeholder text"
                    value={errorValue}
                    onChange={(e) => setErrorValue(e.target.value)}
                    state="error"
                    message={"Message"}
                />
                <CommonTextarea
                    label="Label"
                    placeholder="Placeholder text"
                    value={errorValue}
                    onChange={(e) => setErrorValue(e.target.value)}
                    state="error"
                    message={"Message"}
                    darkPlaceholder={true}
                />

                <CommonTextarea
                    label="Label"
                    placeholder="Placeholder text"
                    value={""}
                    state="disabled"
                />
                <CommonTextarea
                    label="Label"
                    placeholder="Placeholder text"
                    value={""}
                    state="disabled"
                    darkPlaceholder={true}
                />
            </div>
        </div>
    );
}
