import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CSSProperties, ReactNode } from "react";
import firstTutorialImageUrl from "../../assets/tutorial-1.png";
import secondTutorialImageUrl from "../../assets/tutorial-2.png";
import TutorialStep from "../../components/tutorial/TutorialStep";
import TutorialStepTwoOmr from "../../components/tutorial/TutorialStepTwoOmr";
import TutorialStepTypeBOmr from "../../components/tutorial/TutorialStepTypeBOmr";
import TutorialCalculator from "../../components/tutorial/TutorialCalculator";
import TutorialFinalSection from "../../components/tutorial/TutorialFinalSection";
import OmrWrapper from "../../components/tutorial/OmrWrapper";

type StepNextCondition =
  | { type: "none" }
  | {
    type: "omrQuestionSelected";
    questionNumber: number;
    requiredOption?: number;
    blockedMessage?: string;
  }
  | {
    type: "omrQuestionCleared";
    questionNumber: number;
    blockedMessage?: string;
  }
  | {
    type: "typeBOmrQuestionFilled";
    questionNumber: number;
    blockedMessage?: string;
  }
  | {
    type: "twoOmrProcessCompleted";
    blockedMessage?: string;
  };

interface TutorialStepData {
  visual?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageStyle?: CSSProperties;
  pinVisualTop?: boolean;
  pinVisualToPageTop?: boolean;
  visualPinnedHeight?: number;
  hintText?: string;
  description: ReactNode;
  initialOmrAnswers?: Record<number, number>;
  initialTypeBAnswers?: Record<number, string>;
  initialCalculatorValue?: string;
  initialActiveTypeBQuestion?: number | null;
  initialTwoOmrStage?: "mark" | "clear" | "done";
  nextCondition?: StepNextCondition;
}

export default function TutorialPage() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [omrSelectedAnswers, setOmrSelectedAnswers] = useState<Record<number, number>>({});
  const [typeBAnswers, setTypeBAnswers] = useState<Record<number, string>>({});
  const [calculatorValue, setCalculatorValue] = useState("");
  const [activeTypeBQuestion, setActiveTypeBQuestion] = useState<number | null>(null);
  const [twoOmrStage, setTwoOmrStage] = useState<"mark" | "clear" | "done">("mark");

  const steps: TutorialStepData[] = [
    {
      imageSrc: firstTutorialImageUrl,
      imageAlt: "모의고사 소개 이미지",
      imageStyle: {
        width: "316px",
        height: "432px",
        opacity: 1,
      },
      description: (
        <p className="font-['Pretendard'] font-extrabold text-[36px] leading-[100%] tracking-[0.36px] text-center text-[#090909]">
          <span className="block whitespace-nowrap">모의고사 모드는 처음이시죠? 실전 모의고사는</span>
          <span className="block whitespace-nowrap">실전과 최대한 비슷한 환경으로 진행돼요</span>
        </p>
      ),
      nextCondition: { type: "none" },
    },
    {
      visual: (
        <div className="">
          <img
            src={firstTutorialImageUrl}
            alt="튜토리얼 이미지 1"
            className="inline-block select-none"
            draggable={false}
          />
          <img
            src={secondTutorialImageUrl}
            alt="튜토리얼 이미지 2"
            className="ml-12 inline-block select-none"
            draggable={false}
          />
        </div>
      ),
      description: (
        <p className="font-['Pretendard'] font-extrabold text-[36px] leading-[100%] tracking-[0.36px] text-center text-[#090909]">
          <span className="block whitespace-pre-line">실제 시험지 크기에 인쇄된 시험지에 문제를 풀고{"\n"}화면에 표시된 OMR카드에 답을 마킹해요</span>
        </p>
      ),
      nextCondition: { type: "none" },
    },
    {
      visual: (
        <OmrWrapper
          width={600}
          height={659}
          paddingClassName="pt-4 px-6 pb-1"
          contentClassName="overflow-x-auto overflow-y-hidden"
          footerType="objectiveMarks"
          objectiveSectionCount={3}
        >
          <TutorialStepTwoOmr
            selectedAnswers={omrSelectedAnswers}
            onAnswersChange={setOmrSelectedAnswers}
          />
        </OmrWrapper>
      ),
      pinVisualTop: true,
      pinVisualToPageTop: true,
      visualPinnedHeight: 659,
      hintText: twoOmrStage === "done" ? "좋아요! 다음으로 넘어가볼까요?" : "다음으로 넘어가려면 직접 해보세요",
      description:
        twoOmrStage === "done" ? (
          <p className="font-['Pretendard'] font-extrabold text-[36px] leading-[120%] tracking-[0.2px] text-center text-[#090909]">
            <span className="block whitespace-nowrap">2개 이상의 답안을 골라야 하는 문제에서는</span>
            <span className="block whitespace-nowrap">두 답안 모두 마킹하면 돼요</span>
          </p>
        ) : twoOmrStage === "clear" ? (
          <p className="font-['Pretendard'] font-extrabold text-[36px] leading-[120%] tracking-[0.2px] text-center text-[#090909]">
            <span className="block whitespace-nowrap">마킹한 곳을 한 번 더 터치하면 지울 수 있어요</span>
            <span className="block whitespace-nowrap">
              <span className="text-[#5784F1]">15번 문제</span>에 <span className="text-[#5784F1]">3번</span> 답안을 지워보세요
            </span>
          </p>
        ) : (
          <p className="font-['Pretendard'] font-extrabold text-[36px] leading-[120%] tracking-[0.2px] text-center text-[#090909]">
            <span className="block whitespace-nowrap">객관식 답안은 화면을 터치해서 마킹해요</span>
            <span className="block whitespace-nowrap">
              <span className="text-[#5784F1]">15번 문제</span>에 <span className="text-[#5784F1]">3번</span>으로 답안을
              마킹해보세요
            </span>
          </p>
        ),
      initialOmrAnswers: {},
      initialTwoOmrStage: "mark",
      nextCondition: {
        type: "twoOmrProcessCompleted",
      },
    },
    {
      visual: (
        <div
          className="flex items-start gap-4 -translate-x-4"
          onClick={() => {
            setActiveTypeBQuestion(null);
            setCalculatorValue("");
          }}
        >
          <div onClick={(event) => event.stopPropagation()}>
            <OmrWrapper
              width={408}
              height={659}
              paddingClassName="pt-4 px-6 pb-1"
              footerType="subjectiveGuide"
            >
              <TutorialStepTypeBOmr
                answers={typeBAnswers}
                activeQuestion={activeTypeBQuestion ?? undefined}
                guideQuestionNumber={4}
                onSelectQuestion={(questionNumber) => {
                  setActiveTypeBQuestion(questionNumber);
                  setCalculatorValue(typeBAnswers[questionNumber] ?? "");
                }}
              />
            </OmrWrapper>
          </div>
          <div onClick={(event) => event.stopPropagation()} className="mt-auto">
            <TutorialCalculator
              value={calculatorValue}
              isTargetFocused={activeTypeBQuestion !== null}
              focusedQuestionNumber={activeTypeBQuestion}
              onChange={setCalculatorValue}
              onCommit={(value) => {
                if (!value || activeTypeBQuestion === null) return;
                setTypeBAnswers((prev) => ({ ...prev, [activeTypeBQuestion]: value }));
                setActiveTypeBQuestion(null);
                setCalculatorValue("");
              }}
            />
          </div>
        </div >
      ),
      pinVisualTop: true,
      pinVisualToPageTop: true,
      visualPinnedHeight: 659,
      hintText: typeBAnswers[4]?.trim() ? "좋아요! 다음으로 넘어가볼까요?" : "다음으로 넘어가려면 직접 해보세요",
      description: typeBAnswers[4]?.trim() ? (
        <p className="font-['Pretendard'] font-extrabold text-[36px] leading-[120%] tracking-[0.2px] text-center text-[#090909]">
          <span className="block whitespace-nowrap">입력한 답안을 수정하려면</span>
          <span className="block whitespace-nowrap">해당 문제를 다시 한 번 터치해요</span>
        </p>
      ) : activeTypeBQuestion === 4 ? (
        <p className="font-['Pretendard'] font-extrabold text-[36px] leading-[120%] tracking-[0.2px] text-center text-[#090909]">
          <span className="block whitespace-nowrap">아무 숫자나 입력하고</span>
          <span className="block whitespace-nowrap">
            <span className="text-[#5784F1]">완료</span> 버튼을 눌러서 답안을 작성해요
          </span>
        </p>
      ) : (
        <p className="font-['Pretendard'] font-extrabold text-[36px] leading-[120%] tracking-[0.2px] text-center text-[#090909]">
          <span className="block whitespace-nowrap">주관식 답안을 입력하려면 입력할 곳을 터치해요</span>
          <span className="block whitespace-nowrap">
            <span className="text-[#5784F1]">4번 문제</span>의 답안을 입력해볼까요?
          </span>
        </p>
      ),
      initialTypeBAnswers: {},
      initialCalculatorValue: "",
      initialActiveTypeBQuestion: null,
      nextCondition: {
        type: "typeBOmrQuestionFilled",
        questionNumber: 4,
      },
    },
    {
      visual: <TutorialFinalSection />,
      description: <div />,
      nextCondition: { type: "none" },
    },
  ];

  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;
  const currentCondition = currentStep.nextCondition ?? { type: "none" as const };

  useEffect(() => {
    setOmrSelectedAnswers(currentStep.initialOmrAnswers ?? {});
    setTypeBAnswers(currentStep.initialTypeBAnswers ?? {});
    setCalculatorValue(currentStep.initialCalculatorValue ?? "");
    setActiveTypeBQuestion(currentStep.initialActiveTypeBQuestion ?? null);
    setTwoOmrStage(currentStep.initialTwoOmrStage ?? "mark");
  }, [stepIndex]);

  useEffect(() => {
    const currentStepIsTwoOmrProcess = currentStep.nextCondition?.type === "twoOmrProcessCompleted";
    if (!currentStepIsTwoOmrProcess) {
      return;
    }

    if (twoOmrStage === "mark" && omrSelectedAnswers[15] === 3) {
      setTwoOmrStage("clear");
      return;
    }

    if (twoOmrStage === "clear" && !omrSelectedAnswers[15]) {
      setTwoOmrStage("done");
    }
  }, [currentStep, omrSelectedAnswers, twoOmrStage]);

  const isConditionSatisfied = (() => {
    if (currentCondition.type === "none") {
      return true;
    }

    if (currentCondition.type === "omrQuestionCleared") {
      return !omrSelectedAnswers[currentCondition.questionNumber];
    }

    if (currentCondition.type === "typeBOmrQuestionFilled") {
      return Boolean(typeBAnswers[currentCondition.questionNumber]?.trim());
    }

    if (currentCondition.type === "twoOmrProcessCompleted") {
      return twoOmrStage === "done";
    }

    const selected = omrSelectedAnswers[currentCondition.questionNumber];
    if (!selected) {
      return false;
    }

    if (currentCondition.requiredOption === undefined) {
      return true;
    }

    return selected === currentCondition.requiredOption;
  })();

  const handlePrevious = () => setStepIndex((prev) => Math.max(prev - 1, 0));
  const handleSkip = () => navigate("/exam");
  const handleNext = () => {
    if (!isConditionSatisfied) {
      return;
    }

    if (isLastStep) {
      navigate("/exam");
      return;
    }

    setStepIndex((prev) => prev + 1);
  };

  return (
    <TutorialStep
      visual={currentStep.visual}
      imageSrc={currentStep.imageSrc}
      imageAlt={currentStep.imageAlt}
      imageStyle={currentStep.imageStyle}
      pinVisualTop={currentStep.pinVisualTop}
      pinVisualToPageTop={currentStep.pinVisualToPageTop}
      visualPinnedHeight={currentStep.visualPinnedHeight}
      hintText={currentStep.hintText}
      description={currentStep.description}
      showPrevious={stepIndex > 0}
      showSkip={!isLastStep}
      onPrevious={handlePrevious}
      onSkip={handleSkip}
      onNext={handleNext}
      canProceed={isConditionSatisfied}
      nextBlockedMessage={
        !isConditionSatisfied && currentCondition.type !== "none"
          ? currentCondition.blockedMessage
          : undefined
      }
      nextLabel={isLastStep ? "시험 화면으로 이동" : "다음"}
    />
  );
}
