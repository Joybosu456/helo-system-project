"use client";

import React from "react";

type StepState = "completed" | "current" | "upcoming";

interface StepItem {
    id: string;
    label: string;
    description?: string;
    state: StepState;
    subSteps?: {
        id: string;
        label: string;
        state: StepState;
    }[];
}

interface CommonStepperProps {
    steps: StepItem[];
    orientation?: "horizontal" | "vertical";
    showLine?: boolean;
    compact?: boolean;
    className?: string;
}

function StepCircle({ index, state }: { index: number; state: StepState }) {
    const base =
        "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium border transition-colors";

    if (state === "completed") {
        return (
            <div className={`${base} bg-green-500 border-green-500 text-white`}>
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M16.667 5 7.5 14.167 3.333 10"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        );
    }

    if (state === "current") {
        return (
            <div className={`${base} bg-white border-green-500 text-green-600`}>
                {index}
            </div>
        );
    }

    return (
        <div className={`${base} bg-gray-100 border-gray-200 text-gray-400`}>
            {index}
        </div>
    );
}

function StepLabel({
    label,
    description,
    state,
    badge,
}: {
    label: string;
    description?: string;
    state: StepState;
    badge?: string;
}) {
    return (
        <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
                <span
                    className={`text-sm font-medium ${state === "completed" || state === "current"
                            ? "text-gray-900"
                            : "text-gray-400"
                        }`}
                >
                    {label}
                </span>
                {badge && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                        {badge}
                    </span>
                )}
            </div>
            {description && (
                <span className="text-xs text-gray-500">{description}</span>
            )}
        </div>
    );
}

export default function CommonStepper({
    steps,
    orientation = "horizontal",
    showLine = true,
    compact = false,
    className = "",
}: CommonStepperProps) {
    if (orientation === "horizontal") {
        return (
            <div className={`flex items-start gap-0 ${className}`}>
                {steps.map((step, idx) => {
                    const isLast = idx === steps.length - 1;
                    const lineActive =
                        step.state === "completed" ||
                        (step.state === "current" &&
                            steps[idx + 1] &&
                            steps[idx + 1].state !== "completed");

                    return (
                        <div key={step.id} className="flex flex-col items-start flex-1 min-w-0">
                            <div className="flex items-center w-full">
                                <StepCircle index={idx + 1} state={step.state} />
                                {!isLast && showLine && (
                                    <div
                                        className={`h-px flex-1 ${lineActive ? "bg-green-500" : "bg-gray-200"
                                            }`}
                                    />
                                )}
                            </div>
                            <div className="mt-2">
                                <StepLabel
                                    label={step.label}
                                    description={step.description}
                                    state={step.state}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className={`flex flex-col ${className}`}>
            {steps.map((step, idx) => {
                const isLast = idx === steps.length - 1;
                return (
                    <div key={step.id} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                            <StepCircle index={idx + 1} state={step.state} />
                            {!isLast && showLine && (
                                <div
                                    className={`w-px flex-1 min-h-10 ${step.state === "completed" || step.state === "current"
                                            ? "bg-green-500"
                                            : "bg-gray-200"
                                        }`}
                                />
                            )}
                        </div>
                        <div className="pb-4">
                            <StepLabel
                                label={step.label}
                                description={step.description}
                                state={step.state}
                                badge={compact ? step.description : undefined}
                            />
                            {!compact &&
                                step.subSteps &&
                                step.subSteps.length > 0 && (
                                    <div className="mt-2 ml-5 space-y-1">
                                        {step.subSteps.map((sub) => (
                                            <div
                                                key={sub.id}
                                                className="flex items-center gap-2 text-xs text-gray-700"
                                            >
                                                <span
                                                    className={`w-3 h-3 rounded-full border flex items-center justify-center ${sub.state === "completed"
                                                            ? "border-green-500"
                                                            : "border-gray-300"
                                                        }`}
                                                >
                                                    {sub.state === "completed" && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                    )}
                                                </span>
                                                <span
                                                    className={
                                                        sub.state === "completed"
                                                            ? "text-gray-800"
                                                            : "text-gray-500"
                                                    }
                                                >
                                                    {sub.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


