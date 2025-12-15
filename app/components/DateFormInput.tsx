type InputState = "default" | "focus" | "success" | "error" | "disabled";

interface FormInputProps {
  label: string;
  type?: "text" | "date";
  placeholder?: string;
  value?: string;
  state?: InputState;
  message?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  state = "default",
  message,
  onChange,
}: FormInputProps) {
  const stateClasses = {
    default: "border-gray-300 focus:border-blue-500",
    focus: "border-blue-500 ring-1 ring-blue-500",
    success: "border-green-500 ring-1 ring-green-500",
    error: "border-red-500 ring-1 ring-red-500",
    disabled: "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed",
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">{label}</label>

      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={state === "disabled"}
          className={`w-full rounded-md px-3 py-2 text-sm border outline-none
            ${stateClasses[state]}
          `}
        />

        {type === "date" && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            📅
          </span>
        )}
      </div>

      {message && (
        <p
          className={`mt-1 text-xs ${
            state === "success"
              ? "text-green-600"
              : state === "error"
              ? "text-red-600"
              : "text-gray-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
