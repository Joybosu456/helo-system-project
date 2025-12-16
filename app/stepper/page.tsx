"use client";

import CommonStepper from "../components/CommonStepper";

const horizontalSteps = [
  {
    id: "h1",
    label: "Step",
    description: "Description",
    state: "completed" as const,
  },
  {
    id: "h2",
    label: "Step",
    description: "Description",
    state: "current" as const,
  },
  {
    id: "h3",
    label: "Step",
    description: "Description",
    state: "upcoming" as const,
  },
];

const verticalSimple = [
  {
    id: "v1",
    label: "Step",
    description: "Description",
    state: "completed" as const,
  },
  {
    id: "v2",
    label: "Step",
    description: "Description",
    state: "current" as const,
  },
  {
    id: "v3",
    label: "Step",
    description: "Description",
    state: "upcoming" as const,
  },
];

const verticalWithSubsteps = [
  {
    id: "vs1",
    label: "Step",
    description: "Status",
    state: "completed" as const,
  },
  {
    id: "vs2",
    label: "Step",
    description: "Status",
    state: "current" as const,
    subSteps: [
      { id: "s1", label: "Sub step", state: "completed" as const },
      { id: "s2", label: "Sub step", state: "completed" as const },
      { id: "s3", label: "Sub step", state: "upcoming" as const },
    ],
  },
  {
    id: "vs3",
    label: "Step",
    description: "Status",
    state: "upcoming" as const,
  },
];

export default function StepperPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Stepper</h2>

      <div className="flex gap-12 items-start">
        {/* Horizontal progress stepper */}
        <div className="flex-1">
          <CommonStepper steps={horizontalSteps} orientation="horizontal" />
        </div>

        {/* Vertical simple stepper */}
        <div>
          <CommonStepper
            steps={verticalSimple}
            orientation="vertical"
            className="ml-4"
          />
        </div>

        {/* Vertical with sub steps */}
        <div>
          <CommonStepper
            steps={verticalWithSubsteps}
            orientation="vertical"
            className="ml-4"
          />
        </div>
      </div>
    </div>
  );
}


