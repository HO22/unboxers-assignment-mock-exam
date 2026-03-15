import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExamInfo, useSubmitExam } from "../../api/hooks";
import problemIconUrl from "../../assets/problem.svg";
import scanEffectUrl from "../../assets/scan.svg";
import ExamOmrComposite from "../../components/exam/ExamOmrComposite";
import TutorialCalculator from "../../components/tutorial/TutorialCalculator";
import type { Answer, ExamResult, StudentInfo } from "../../types/exam";

const OBJECTIVE_COUNT = 30;
const SUBJECTIVE_COUNT = 12;
const MAX_SUBJECTIVE_INPUT_QUESTION = 12;
const EXAM_DURATION_MINUTES = 60;
const PRE_START_COUNTDOWN_SECONDS = 10;
const EXAM_DURATION_SECONDS = EXAM_DURATION_MINUTES * 60;

function parseSubjectiveAnswer(raw: string): number | null {
  const value = raw.trim();
  if (!value) return null;

  // Decimal/integer form: -12, 3, 0.25
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }

  // Fraction form: -3/2, 5/4
  if (/^-?\d+\/\d+$/.test(value)) {
    const [numeratorText, denominatorText] = value.split("/");
    const numerator = Number(numeratorText);
    const denominator = Number(denominatorText);
    if (Number.isNaN(numerator) || Number.isNaN(denominator) || denominator === 0) return null;
    return numerator / denominator;
  }

  return null;
}

export default function ExamPage() {
  const navigate = useNavigate();
  const examInfoQuery = useExamInfo();
  const submitExamMutation = useSubmitExam();
  const hasAutoSubmittedRef = useRef(false);
  const scanTimeoutRef = useRef<number | null>(null);
  const scanRafRef = useRef<number | null>(null);

  const [studentInfo] = useState<StudentInfo>({
    name: "홍길동",
    school: "베이스고",
    grade: 1,
    studentNumber: 1,
    seatNumber: 1,
  });

  const [objectiveAnswers, setObjectiveAnswers] = useState<Record<number, number>>({});
  const [subjectiveAnswers, setSubjectiveAnswers] = useState<Record<number, string>>({});
  const [calculatorValue, setCalculatorValue] = useState("");
  const [activeSubjectiveQuestion, setActiveSubjectiveQuestion] = useState<number | null>(null);
  const [preStartSeconds, setPreStartSeconds] = useState(PRE_START_COUNTDOWN_SECONDS);
  const [examRemainingSeconds, setExamRemainingSeconds] = useState(EXAM_DURATION_SECONDS);
  const [isSubmittedView, setIsSubmittedView] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<ExamResult | null>(null);
  const [isScanningResult, setIsScanningResult] = useState(false);
  const [hasScanStarted, setHasScanStarted] = useState(false);
  const inputLimit = MAX_SUBJECTIVE_INPUT_QUESTION ?? SUBJECTIVE_COUNT;
  const isFocusedInRange =
    activeSubjectiveQuestion !== null && activeSubjectiveQuestion <= inputLimit;
  const isExamStarted = preStartSeconds === 0;

  const buildAnswers = (autoFillUnansweredWithZero: boolean) => {
    const answers: Answer[] = [];

    for (let i = 1; i <= OBJECTIVE_COUNT; i++) {
      const value = objectiveAnswers[i];
      if (value || autoFillUnansweredWithZero) {
        answers.push({
          answerType: "objective",
          number: i,
          answer: value ?? 0,
        });
      }
    }

    for (let i = 1; i <= SUBJECTIVE_COUNT; i++) {
      const answer = parseSubjectiveAnswer(subjectiveAnswers[i] ?? "");
      if (answer !== null || autoFillUnansweredWithZero) {
        answers.push({
          answerType: "subjective",
          number: i,
          answer: answer ?? 0,
        });
      }
    }

    return answers;
  };

  const handleSubmit = async () => {
    if (isSubmittedView || submitExamMutation.isPending) return;

    try {
      const result = await submitExamMutation.mutateAsync({
        ...studentInfo,
        answers: buildAnswers(true),
      });
      setSubmittedResult(result.data);
      setIsSubmittedView(true);
      setActiveSubjectiveQuestion(null);
      setCalculatorValue("");
    } catch (error) {
      alert("답안 제출에 실패했습니다.");
      console.error(error);
    }
  };

  const handleResultView = () => {
    if (!submittedResult || isScanningResult) return;

    setHasScanStarted(false);
    setIsScanningResult(true);

    if (scanRafRef.current) {
      window.cancelAnimationFrame(scanRafRef.current);
    }
    scanRafRef.current = window.requestAnimationFrame(() => {
      setHasScanStarted(true);
    });

    if (scanTimeoutRef.current) {
      window.clearTimeout(scanTimeoutRef.current);
    }

    scanTimeoutRef.current = window.setTimeout(() => {
      navigate("/result", { state: { result: submittedResult } });
    }, 3000);
  };

  useEffect(() => {
    if (preStartSeconds <= 0 || isSubmittedView) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setPreStartSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isSubmittedView, preStartSeconds]);

  useEffect(() => {
    if (
      !isExamStarted ||
      examRemainingSeconds <= 0 ||
      submitExamMutation.isPending ||
      hasAutoSubmittedRef.current ||
      isSubmittedView
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setExamRemainingSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [examRemainingSeconds, isExamStarted, isSubmittedView, submitExamMutation.isPending]);

  useEffect(() => {
    if (
      !isExamStarted ||
      examRemainingSeconds !== 0 ||
      submitExamMutation.isPending ||
      hasAutoSubmittedRef.current ||
      isSubmittedView
    ) {
      return;
    }

    hasAutoSubmittedRef.current = true;
    void (async () => {
      try {
        const result = await submitExamMutation.mutateAsync({
          ...studentInfo,
          answers: buildAnswers(true),
        });
        setSubmittedResult(result.data);
        setIsSubmittedView(true);
        setActiveSubjectiveQuestion(null);
        setCalculatorValue("");
      } catch (error) {
        hasAutoSubmittedRef.current = false;
        alert("자동 제출에 실패했습니다.");
        console.error(error);
      }
    })();
  }, [examRemainingSeconds, isExamStarted, isSubmittedView, studentInfo, submitExamMutation]);

  useEffect(() => {
    return () => {
      if (scanTimeoutRef.current) {
        window.clearTimeout(scanTimeoutRef.current);
      }
      if (scanRafRef.current) {
        window.cancelAnimationFrame(scanRafRef.current);
      }
    };
  }, []);

  const minutes = Math.floor(examRemainingSeconds / 60);
  const seconds = examRemainingSeconds % 60;
  const timerText = isExamStarted
    ? `${minutes}분 ${seconds.toString().padStart(2, "0")}초`
    : `${preStartSeconds}초`;
  const progressPercent = isExamStarted
    ? (examRemainingSeconds / EXAM_DURATION_SECONDS) * 100
    : (preStartSeconds / PRE_START_COUNTDOWN_SECONDS) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 px-6 py-6 flex items-center justify-center">
        <div className="w-fit">
          <div className="flex items-start gap-[60px]">
            <div className="relative shrink-0">
              <div
                className={`rounded-2xl bg-[#FFFDF1] shadow-[0px_4px_16px_0px_#00000026] p-6 ${
                  isSubmittedView ? "pointer-events-none scale-[0.7] origin-center transition-transform duration-300" : ""
                }`}
              >
                <ExamOmrComposite
                  studentInfo={studentInfo}
                  examTitle={examInfoQuery.data?.data.title}
                  subjectName={examInfoQuery.data?.data.description}
                  supervisorName={examInfoQuery.data?.data.supervisorName}
                  objectiveQuestionCount={OBJECTIVE_COUNT}
                  subjectiveQuestionCount={SUBJECTIVE_COUNT}
                  maxSubjectiveInputQuestion={MAX_SUBJECTIVE_INPUT_QUESTION}
                  objectiveAnswers={objectiveAnswers}
                  subjectiveAnswers={subjectiveAnswers}
                  activeSubjectiveQuestion={activeSubjectiveQuestion}
                  onObjectiveAnswersChange={setObjectiveAnswers}
                  onSubjectiveQuestionSelect={(questionNumber) => {
                    setActiveSubjectiveQuestion(questionNumber);
                    setCalculatorValue(subjectiveAnswers[questionNumber] ?? "");
                  }}
                />
              </div>
              {isSubmittedView && isScanningResult ? (
                <img
                  src={scanEffectUrl}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 z-20 -translate-y-1/2 transition-[left] duration-[3000ms] ease-linear"
                  style={{
                    transform: "translate(-50%, 0)",
                    left: hasScanStarted ? "calc(100% + 80px)" : "-80px",
                  }}
                />
              ) : null}
            </div>
            {!isSubmittedView ? (
              <div className="flex flex-1 flex-col w-[243px]">
                <p className="flex flex-1 mb-4 whitespace-pre-line font-['Pretendard'] font-semibold text-[12px] leading-[100%] tracking-[0.07px] text-[#676663]">
                  {"모든 주관식 답은 숫자와 소숫점, 슬래시(/), 마이너스(-) 기호로 이루어져 있습니다.\n\n마이너스 2분의 3을 입력할 때는 “-3/2”라고 입력하면 돼요. 소숫점은 유효숫자 개수를 맞춰서 입력합니다.\n\n단위가 포함된 주관식 답안은 숫자만 입력합니다.\n\n예시)\n제3사분면 → 3\n3,700만원 → 37000000\n95% → 95"}
                </p>
                <TutorialCalculator
                  value={calculatorValue}
                  isTargetFocused={isFocusedInRange}
                  focusedQuestionNumber={activeSubjectiveQuestion}
                  onChange={setCalculatorValue}
                  onCommit={(value) => {
                    if (!value || activeSubjectiveQuestion === null || activeSubjectiveQuestion > inputLimit) return;
                    setSubjectiveAnswers((prev) => ({ ...prev, [activeSubjectiveQuestion]: value }));
                    setActiveSubjectiveQuestion(null);
                    setCalculatorValue("");
                  }}
                />
              </div>
            ) : null}
          </div>
          {isSubmittedView ? (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleResultView}
                disabled={!submittedResult || isScanningResult}
                className="w-[260px] h-[60px] rounded-2xl bg-[linear-gradient(90deg,#333333_0%,#333333_0.01%,#585858_100%)] text-white font-['Pretendard'] font-semibold text-[20px] shadow-[0px_8px_16px_0px_#00000008] disabled:bg-[#D9D9D9] disabled:text-[#9CA3AF]"
              >
                {isScanningResult ? "스캔 중..." : "결과보기"}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {!isSubmittedView ? (
        <div className="w-full px-6 pb-6">
        <div className="w-full rounded-2xl bg-white shadow-[0px_4px_16px_0px_#00000026] px-[60px] py-[35px]">
          <div className="flex items-start justify-between gap-12">
            <div className="flex flex-1 flex-col">
              <p className="font-['Pretendard'] font-semibold text-[20px] leading-[100%] bg-[linear-gradient(90deg,#333333_0%,#585858_100%)] bg-clip-text text-transparent">
                {isExamStarted ? "시험 종료까지 남은 시간" : "시험 시작까지 남은 시간"}
              </p>
              <div className="flex items-end mt-2">
                <span className="font-['Pretendard'] font-extrabold text-[48px] leading-[100%] text-[#F44C47]">
                  {timerText}
                </span>
                <span className="ml-auto font-['Pretendard'] font-semibold text-[17px] leading-[100%] tracking-[0.36px] text-[#585858]">
                  시험 시간 {EXAM_DURATION_MINUTES}분
                </span>
              </div>
              <div className="mt-2 h-2 w-full rounded-[4px] bg-[#F5F5F5] overflow-hidden">
                <div className="h-full bg-[#F44C47] transition-all" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <div className="flex h-full items-center gap-3">
              <button
                type="button"
                className="w-[200px] h-[60px] rounded-2xl bg-white text-[#090909] font-['Pretendard'] font-semibold text-[17px] shadow-[0px_8px_16px_0px_#00000008] inline-flex items-center justify-center gap-[2px]"
              >
                <img src={problemIconUrl} alt="" className="w-6 h-6 shrink-0" aria-hidden />
                문제가 생겼나요?
              </button>
              {isExamStarted ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitExamMutation.isPending}
                  className="w-[200px] h-[60px] rounded-2xl bg-[linear-gradient(90deg,#364F8E_0%,#5784F1_100%)] text-white font-['Pretendard'] font-semibold text-[17px] shadow-[0px_8px_16px_0px_#00000008] disabled:bg-[#D9D9D9] disabled:text-[#9CA3AF]"
                >
                  {submitExamMutation.isPending ? "제출 중..." : "답안 제출하기"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
        </div>
      ) : null}
    </div>
  );
}
