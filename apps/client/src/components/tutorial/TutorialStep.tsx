import type { CSSProperties, ReactNode } from "react";
import leftArrowUrl from "../../assets/left-arrow.svg";
import upArrowUrl from "../../assets/up-arrow.svg";

interface TutorialStepProps {
  visual?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageStyle?: CSSProperties;
  pinVisualTop?: boolean;
  pinVisualToPageTop?: boolean;
  visualPinnedHeight?: number;
  hintText?: string;
  description: ReactNode;
  showPrevious: boolean;
  showSkip?: boolean;
  onPrevious: () => void;
  onSkip: () => void;
  onNext: () => void;
  canProceed?: boolean;
  nextBlockedMessage?: string;
  nextLabel?: string;
}

export default function TutorialStep({
  visual,
  imageSrc,
  imageAlt,
  imageStyle,
  pinVisualTop = false,
  pinVisualToPageTop = false,
  visualPinnedHeight = 0,
  hintText,
  description,
  showPrevious,
  showSkip = true,
  onPrevious,
  onSkip,
  onNext,
  canProceed = true,
  nextBlockedMessage,
  nextLabel = "다음",
}: TutorialStepProps) {
  const buttonTextClass =
    "font-['Pretendard'] font-bold text-[17px] leading-[100%] tracking-[-0.41px] text-center";

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col items-center max-w-[1200px] mx-auto relative">
      {pinVisualToPageTop && visual ? (
        <div className="absolute top-[-65px] left-1/2 -translate-x-1/2">{visual}</div>
      ) : null}

      <div className="my-[80px] flex-1 flex flex-col items-center justify-center w-full">
        <div
          className={`w-full h-[755px] flex flex-col items-center ${pinVisualTop ? "justify-start" : "justify-center"
            }`}
        >
          {pinVisualToPageTop && visualPinnedHeight > 0 ? (
            <div style={{ height: `${visualPinnedHeight}px` }} aria-hidden />
          ) : visual ? (
            visual
          ) : imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt ?? "튜토리얼 이미지"}
              className="select-none"
              style={imageStyle}
              draggable={false}
            />
          ) : null}
          {hintText ? (
            <div className="mt-10 flex flex-col items-center gap-1">
              <img src={upArrowUrl} alt="" className="w-6 h-6 shrink-0" aria-hidden />
              <p className="mt-2 font-['Pretendard'] font-bold text-[19px] leading-[100%] tracking-[-0.41px] text-center text-[#090909]">
                {hintText}
              </p>
            </div>
          ) : null}
          <div className="mt-12">{description}</div>
        </div>

        <div
          className={`mt-12 w-full flex items-center gap-3 pb-3 ${showPrevious ? "max-w-[1200px]" : "max-w-[730px] justify-center"
            }`}
        >
          {showPrevious ? (
            <>
              <button
                type="button"
                onClick={onPrevious}
                className={`${buttonTextClass} w-[243px] h-[52px] rounded-[14px] bg-[#FCFCFC] text-[#090909] inline-flex items-center justify-center`}
                style={{ boxShadow: "0px 8px 16px 0px #00000008" }}
              >
                <img src={leftArrowUrl} alt="" className="w-4 h-6 shrink-0" aria-hidden />
                이전으로
              </button>
              <div className="flex-1" aria-hidden />
            </>
          ) : null}

          {showSkip ? (
            <button
              type="button"
              onClick={onSkip}
              className={`${buttonTextClass} w-[243px] h-[52px] rounded-[14px] bg-[#FCFCFC] text-[#090909]`}
              style={{ boxShadow: "0px 8px 16px 0px #00000008" }}
            >
              튜토리얼 건너뛰기
            </button>
          ) : null}

          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            className={`${buttonTextClass} w-[243px] h-[52px] rounded-[14px] text-white disabled:bg-[#D9D9D9] disabled:text-[#9CA3AF] disabled:cursor-not-allowed`}
            style={{
              background: canProceed
                ? "linear-gradient(90deg, #333333 0%, #333333 0.01%, #585858 100%)"
                : "#D9D9D9",
            }}
          >
            {nextLabel}
          </button>
        </div>
        {!canProceed && nextBlockedMessage ? (
          <p className="mt-2 font-['Pretendard'] text-[14px] text-[#364F8E] text-center">
            {nextBlockedMessage}
          </p>
        ) : null}
      </div>
    </div>
  );
}
