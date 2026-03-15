interface TutorialStepTypeBOmrProps {
  rowCount?: number;
  answers?: Record<number, string>;
  activeQuestion?: number;
  guideQuestionNumber?: number;
  maxSelectableQuestion?: number;
  onSelectQuestion?: (questionNumber: number) => void;
}

export default function TutorialStepTypeBOmr({
  rowCount = 12,
  answers = {},
  activeQuestion,
  guideQuestionNumber,
  maxSelectableQuestion,
  onSelectQuestion,
}: TutorialStepTypeBOmrProps) {
  return (
    <div className="">
      <h3 className=" h-10 border-l-[1.5px] border-r-[1.5px] border-t-[1.5px] border-[#5784F1] flex items-center justify-center text-center font-['Pretendard'] font-semibold text-[24px] leading-[100%] tracking-[0px] text-[#364F8E]">
        주 관 식 답 안
      </h3>
      <div className="grid h-[575px]" style={{ gridTemplateRows: `repeat(${rowCount}, 1fr)` }}>
        {Array.from({ length: rowCount }, (_, idx) => {
          const questionNumber = idx + 1;
          const isActive = activeQuestion === questionNumber;
          const value = answers[questionNumber];
          const isDisabled =
            maxSelectableQuestion !== undefined && questionNumber > maxSelectableQuestion;
          const isGuideBeforeInput = guideQuestionNumber === questionNumber && !value;

          return (
            <div key={`type-b-row-${questionNumber}`} className="grid grid-cols-[28px_1fr]">
              <div
                className={`bg-[#5784F133] border-l-[1.5px] border-t-[1.5px] border-[#5784F1] flex items-center justify-center font-['Pretendard'] font-semibold text-[17px] leading-[100%] tracking-[0px] text-center text-[#364F8E] ${idx === rowCount - 1 ? "border-b-[1.5px]" : ""
                  }`}
              >
                {questionNumber}
              </div>
              <div
                role="button"
                tabIndex={isDisabled ? -1 : 0}
                onClick={() => {
                  if (isDisabled) return;
                  onSelectQuestion?.(questionNumber);
                }}
                onKeyDown={(event) => {
                  if (isDisabled) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelectQuestion?.(questionNumber);
                  }
                }}
                className={`outline-0 outline-offset-[-1px] border-[#5784F1] border-l-[1.5px] border-r-[1.5px] border-t-[1.5px] flex items-center px-3 text-left ${idx === rowCount - 1 ? "border-b-[1.5px]" : ""
                  } ${isActive ? "bg-white" : "bg-[#FFFDF1]"
                  } ${isGuideBeforeInput ? "border-b-[1.5px] outline-[2px] outline-[#5784F1]" : ""
                  } ${isDisabled ? "opacity-40 cursor-not-allowed" : ""
                  }`}
              >
                <input
                  value={value ?? ""}
                  readOnly
                  placeholder={isGuideBeforeInput ? "여기를 터치해줘요!" : "터치해서 주관식 답안 입력"}
                  className="w-full border-none outline-none font-['Pretendard'] font-semibold text-[17px] leading-[100%] tracking-[0px] text-center text-[#090909] placeholder:text-[#BDBCB8] pointer-events-none"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
