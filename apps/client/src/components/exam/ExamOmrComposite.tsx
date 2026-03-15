import ExamSideInfoPanel from "./ExamSideInfoPanel";
import TutorialStepTwoOmr from "../tutorial/TutorialStepTwoOmr";
import TutorialStepTypeBOmr from "../tutorial/TutorialStepTypeBOmr";
import type { StudentInfo } from "../../types/exam";

interface ExamOmrCompositeProps {
  studentInfo: StudentInfo;
  examTitle?: string;
  subjectName?: string;
  supervisorName?: string;
  objectiveQuestionCount: number;
  subjectiveQuestionCount: number;
  maxSubjectiveInputQuestion?: number;
  objectiveAnswers: Record<number, number>;
  subjectiveAnswers: Record<number, string>;
  activeSubjectiveQuestion: number | null;
  onObjectiveAnswersChange: (answers: Record<number, number>) => void;
  onSubjectiveQuestionSelect: (questionNumber: number) => void;
}

export default function ExamOmrComposite({
  studentInfo,
  examTitle,
  subjectName,
  supervisorName,
  objectiveQuestionCount,
  subjectiveQuestionCount,
  maxSubjectiveInputQuestion,
  objectiveAnswers,
  subjectiveAnswers,
  activeSubjectiveQuestion,
  onObjectiveAnswersChange,
  onSubjectiveQuestionSelect,
}: ExamOmrCompositeProps) {
  const inputLimit = maxSubjectiveInputQuestion ?? subjectiveQuestionCount;
  const objectiveSectionCount = Math.ceil(objectiveQuestionCount / 10);

  return (
    <div className="flex items-start gap-6">
      <div className="flex">
        <ExamSideInfoPanel
          studentInfo={studentInfo}
          examTitle={examTitle}
          subjectName={subjectName}
          supervisorName={supervisorName}
        />
        <div className="ml-[-1px]" />
        <div>
          <TutorialStepTwoOmr
            questionCount={objectiveQuestionCount}
            selectedAnswers={objectiveAnswers}
            onAnswersChange={onObjectiveAnswersChange}
          />
          <div className="mt-[2px] grid" style={{ gridTemplateColumns: `repeat(${objectiveSectionCount}, 184px)` }}>
            {Array.from({ length: objectiveSectionCount }, (_, sectionIndex) => (
              <div key={`exam-bottom-group-${sectionIndex}`} className="grid grid-cols-[28px_156px]">
                <div aria-hidden />
                <div className="h-6 flex items-center justify-between px-[14px]">
                  {Array.from({ length: 5 }, (_, idx) => (
                    <span key={`exam-bottom-mark-${sectionIndex}-${idx}`} className="w-2 h-6 bg-[#090909]" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ml-[-1px] w-[360px]">
          <TutorialStepTypeBOmr
            rowCount={subjectiveQuestionCount}
            answers={subjectiveAnswers}
            activeQuestion={activeSubjectiveQuestion ?? undefined}
            maxSelectableQuestion={inputLimit}
            onSelectQuestion={(questionNumber) => {
              if (questionNumber > inputLimit) return;
              onSubjectiveQuestionSelect(questionNumber);
            }}
          />
          <div className="grid grid-cols-[1fr] h-[20px] mt-[3px]">
            <div className="text-center font-['Pretendard'] font-semibold text-[17px] leading-[100%] tracking-[0px] text-[#858585]">
              주관식 입력 부분입니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
