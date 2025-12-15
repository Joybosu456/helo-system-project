"use client";
import { useState } from "react";
import FormInput from "../components/DateFormInput";

export default function Page() {
    const [date, setDate] = useState("");

    return (
        <div className="flex w-full items-center flex-col gap-[10px] justify-center ">
            <div className="flex w-1/2 gap-[10px]">
                <FormInput
                    label="Select Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    state="success"
                    message="Date selected"
                />
                <FormInput
                    label="Select Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    state="error"
                    message="Date selected"
                />
            </div>
            <div className="flex w-1/2 gap-[10px]">
                <FormInput
                    label="Select Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    state="success"
                    message="Date selected"
                />
                <FormInput
                    label="Select Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    state="error"
                    message="Date selected"
                />
            </div>
        </div>
    );
}