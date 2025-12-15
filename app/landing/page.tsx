"use client";

import { useState } from "react";
import CommonInput from "../components/CommonInput";

export default function LandingPage() {
    const [focusValue, setFocusValue] = useState("");

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CommonInput
                    label="Label"
                    placeholder="Placeholder text"
                    state="default"
                />
                <CommonInput
                    label="Label"
                    placeholder="Placeholder text"
                    state="default"
                    darkPlaceholder={true}
                />

                <CommonInput
                    label="Label"
                    placeholder="Placeholder text"
                    value={focusValue}
                    onChange={(e) => setFocusValue(e.target.value)}
                    state="default"
                />
                <CommonInput
                    label="Label"
                    placeholder="Placeholder text"
                    value={focusValue}
                    onChange={(e) => setFocusValue(e.target.value)}
                    state="default"
                    darkPlaceholder={true}
                />

                <CommonInput
                    label="Label"
                    placeholder="Placeholder text"
                    value={""}
                    state="success"
                    message={"Message"}
                />
                <CommonInput
                    label="Label"
                    placeholder="Placeholder text"
                    value={""}
                    state="success"
                    message={"Message"}
                    darkPlaceholder={true}
                />

                <CommonInput
                    label="Label"
                    placeholder="Placeholder text"
                    value={""}
                    state="error"
                    message={"Message"}
                />
                <CommonInput
                    label="Label"
                    placeholder="Placeholder text"
                    value={""}
                    state="error"
                    message={"Message"}
                    darkPlaceholder={true}
                />

                <CommonInput
                    label="Label"
                    placeholder="Placeholder text"
                    value={""}
                    state="disabled"
                />
                <CommonInput
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
