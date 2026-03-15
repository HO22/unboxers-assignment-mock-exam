import { useState } from "react";

type KeyType = "input" | "clear" | "submit";

interface CalculatorKey {
  label: string;
  type: KeyType;
  value?: string;
  colSpan?: 1 | 2 | 3;
}

const KEYS: CalculatorKey[][] = [
  [
    { label: ".", type: "input", value: "." },
    { label: "/", type: "input", value: "/" },
    { label: "-", type: "input", value: "-" },
  ],
  [
    { label: "1", type: "input", value: "1" },
    { label: "2", type: "input", value: "2" },
    { label: "3", type: "input", value: "3" },
  ],
  [
    { label: "4", type: "input", value: "4" },
    { label: "5", type: "input", value: "5" },
    { label: "6", type: "input", value: "6" },
  ],
  [
    { label: "7", type: "input", value: "7" },
    { label: "8", type: "input", value: "8" },
    { label: "9", type: "input", value: "9" },
  ],
  [
    { label: "10", type: "input", value: "10", colSpan: 2 },
    { label: "⌫", type: "clear" },
  ],
];

interface TutorialCalculatorProps {
  value?: string;
  onChange?: (value: string) => void;
  onCommit?: (value: string) => void;
  isTargetFocused?: boolean;
  focusedQuestionNumber?: number | null;
}

export default function TutorialCalculator({
  value,
  onChange,
  onCommit,
  isTargetFocused = true,
  focusedQuestionNumber = null,
}: TutorialCalculatorProps) {
  const [internalValue, setInternalValue] = useState("");
  const expression = value ?? internalValue;

  const updateValue = (next: string) => {
    if (value === undefined) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  const handleKey = (key: CalculatorKey) => {
    if (!isTargetFocused) {
      return;
    }

    if (key.type === "submit") {
      onCommit?.(expression.trim());
      return;
    }

    if (key.type === "clear") {
      updateValue(expression.slice(0, -1));
      return;
    }
    if (!key.value) return;
    updateValue(`${expression}${key.value}`);
  };

  const hasValue = Boolean(expression.trim());
  const isFocusedWithoutValue = isTargetFocused && !hasValue;
  const displayText = isTargetFocused
    ? hasValue
      ? expression
      : focusedQuestionNumber
        ? `${focusedQuestionNumber}번 답안을 입력하세요`
        : "0"
    : "입력할 곳을 터치해주세요";
  const displayTextClassName = hasValue ? "text-[#090909]" : "text-[#BDBCB8]";
  const canComplete = isTargetFocused && Boolean(expression.trim());

  return (
    <div className="bg-[#F5F5F5]">
      <div
        className={`mb-3 rounded-[12px] bg-white p-4 text-center border-[2px] shadow-[0px_8px_16px_0px_#00000008] ${isTargetFocused ? "border-[#5784F1] text-[#090909]" : "border-transparent text-[#BDBCB8]"
          }`}
      >
        <p
          className={`font-['Pretendard'] font-semibold text-[20px] leading-[100%] truncate ${
            isFocusedWithoutValue || !isTargetFocused ? "text-[#BDBCB8]" : displayTextClassName
          }`}
        >
          {displayText}
        </p>
      </div>

      <div className="grid auto-rows-max gap-3 content-start">
        {KEYS.map((row, rowIndex) => (
          <div key={`calc-row-${rowIndex}`} className="grid grid-cols-[repeat(3,73px)] gap-3">
            {row.map((key, keyIndex) => {
              const resolvedColSpan = key.colSpan ?? (row.length === 1 ? 3 : row.length === 2 && keyIndex === 0 ? 2 : 1);
              const colSpanClass = resolvedColSpan === 3 ? "col-span-3" : resolvedColSpan === 2 ? "col-span-2" : "";

              return (
                <button
                  key={`calc-key-${rowIndex}-${keyIndex}`}
                  type="button"
                  onClick={() => handleKey(key)}
                  className={`w-full h-[52px] rounded-[12px] bg-white shadow-[0px_8px_16px_0px_#00000008] font-['Pretendard'] text-[#090909] ${key.type === "input" ? "font-bold text-[24px]" : "font-semibold text-[20px]"
                    } ${colSpanClass} ${key.type === "submit" ? "text-[#B6B6B6] font-bold text-[20px]" : ""
                    }`}
                >
                  {key.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onCommit?.(expression.trim())}
        disabled={!canComplete}
        className={`mt-6 w-full h-[52px] rounded-[12px] shadow-[0px_8px_16px_0px_#00000008] font-['Pretendard'] font-bold text-[20px] transition-colors ${canComplete
          ? "bg-[linear-gradient(90deg,#364F8E_0%,#5784F1_100%)] text-white"
          : "bg-[#FAFAFA] text-[#B6B6B6]"
          }`}
      >
        완료
      </button>
    </div>
  );
}
