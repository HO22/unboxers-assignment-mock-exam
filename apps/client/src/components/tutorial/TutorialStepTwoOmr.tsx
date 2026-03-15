import { useState } from "react";

const OPTIONS = [1, 2, 3, 4, 5];

interface TutorialStepTwoOmrProps {
  questionCount?: number;
  rowsPerSection?: number;
  selectedAnswers?: Record<number, number>;
  onAnswersChange?: (answers: Record<number, number>) => void;
}

function createSectionQuestionNumbers(questionCount: number, rowsPerSection: number) {
  const sectionCount = Math.ceil(questionCount / rowsPerSection);
  return Array.from({ length: sectionCount }, (_, sectionIndex) =>
    Array.from({ length: rowsPerSection }, (_, rowIndex) => {
      const questionNumber = sectionIndex * rowsPerSection + rowIndex + 1;
      return questionNumber <= questionCount ? questionNumber : null;
    }),
  );
}

export default function TutorialStepTwoOmr({
  questionCount = 30,
  rowsPerSection = 10,
  selectedAnswers,
  onAnswersChange,
}: TutorialStepTwoOmrProps) {
  const [internalSelectedAnswers, setInternalSelectedAnswers] = useState<Record<number, number>>({});
  const answers = selectedAnswers ?? internalSelectedAnswers;
  const sectionQuestionNumbers = createSectionQuestionNumbers(questionCount, rowsPerSection);
  const sectionCount = sectionQuestionNumbers.length;

  const handleSelect = (questionNumber: number, option: number) => {
    const nextAnswers = {
      ...answers,
      [questionNumber]: answers[questionNumber] === option ? 0 : option,
    };

    if (selectedAnswers === undefined) {
      setInternalSelectedAnswers(nextAnswers);
    }

    onAnswersChange?.(nextAnswers);
  };

  return (
    <div className="">
      <div className="border-[1.5px] border-[#5784F1] overflow-hidden">
        <div className="h-10 border-b-[1.5px] border-[#5784F1] flex items-center justify-center font-['Pretendard'] font-bold text-[24px] leading-[100%] tracking-[10px] text-[#364F8E]">
          객 관 식 답 안
        </div>

        <div className="grid" style={{ gridTemplateColumns: `repeat(${sectionCount}, 184px)` }}>
          {sectionQuestionNumbers.map((questionNumbers, sectionIndex) => (
            <div
              key={sectionIndex}
              className={`relative grid grid-cols-[28px_1fr] ${sectionIndex < sectionCount - 1 ? "border-r-[1.5px] border-[#5784F1]" : ""
                }`}
            >
              <div
                className="h-[572px] bg-[#5784F133] border-r-[1.5px] border-[#5784F1] grid"
                style={{ gridTemplateRows: `repeat(${rowsPerSection}, minmax(0, 1fr))` }}
              >
                {questionNumbers.map((questionNumber, rowIndex) => (
                  <div
                    key={`number-${sectionIndex}-${rowIndex}`}
                    className={`w-full flex items-center justify-center font-['Pretendard'] font-semibold text-[14px] leading-[100%] tracking-[0px] text-center text-[#364F8E] ${rowIndex === 0 ? "pt-[6px]" : rowIndex === rowsPerSection - 1 ? "pb-[6px]" : ""
                      }`}
                  >
                    {questionNumber ?? ""}
                  </div>
                ))}
              </div>

              <div
                className="h-[572px] grid overflow-hidden"
                style={{ gridTemplateRows: `repeat(${rowsPerSection}, minmax(0, 1fr))` }}
              >
                {questionNumbers.map((questionNumber, rowIndex) => {
                  const isSelectable = questionNumber !== null;
                  const isLightRow =
                    isSelectable &&
                    ((questionNumber >= 1 && questionNumber <= 5) ||
                      (questionNumber >= 16 && questionNumber <= 20) ||
                      (questionNumber >= 21 && questionNumber <= 25));

                  return (
                    <div
                      key={`options-${sectionIndex}-${rowIndex}`}
                      className={`flex px-2 items-center gap-[10px] justify-between ${rowIndex === 0 ? "pt-[6px]" : rowIndex === rowsPerSection - 1 ? "pb-[6px]" : ""
                        } ${isLightRow ? "bg-[#FFFDF1]" : "bg-[#5784F11A]"}`}
                    >
                      {OPTIONS.map((option) => {
                        const isSelected = isSelectable && answers[questionNumber] === option;

                        return (
                          <button
                            key={`${sectionIndex}-${rowIndex}-${option}`}
                            type="button"
                            onClick={() => questionNumber !== null && handleSelect(questionNumber, option)}
                            className={`py-[6px] w-5 h-[44px] rounded-[12px] font-['Pretendard'] font-bold text-[12px] leading-[16px] tracking-[0px] text-center transition-colors ${isSelected
                              ? "bg-[#090909] text-white"
                              : "bg-[#A5A4A0] text-white"
                              }`}
                            aria-label={questionNumber !== null ? `${questionNumber}번 ${option}번` : "빈 문항"}
                            aria-pressed={isSelected}
                            disabled={!isSelectable}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              <div
                className="pointer-events-none absolute left-[28px] top-[286px] w-[156px] h-[1.5px] bg-[repeating-linear-gradient(to_right,#5784F1_0_6px,transparent_6px_12px)]"
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
