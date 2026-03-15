import type { ReactNode } from "react";

type OmrFooterType = "objectiveMarks" | "subjectiveGuide";

interface OmrWrapperProps {
  width: number;
  height: number;
  paddingClassName: string;
  className?: string;
  contentClassName?: string;
  footerType?: OmrFooterType;
  objectiveSectionCount?: number;
  subjectiveGuideText?: string;
  children: ReactNode;
}

export default function OmrWrapper({
  width,
  height,
  paddingClassName,
  className = "",
  contentClassName = "",
  footerType,
  objectiveSectionCount = 0,
  subjectiveGuideText = "주관식 입력 부분입니다.",
  children,
}: OmrWrapperProps) {
  const renderFooter = () => {
    if (footerType === "objectiveMarks") {
      return (
        <div className="mt-[2px] grid" style={{ gridTemplateColumns: `repeat(${objectiveSectionCount}, 184px)` }}>
          {Array.from({ length: objectiveSectionCount }, (_, sectionIndex) => (
            <div key={`bottom-group-${sectionIndex}`} className="grid grid-cols-[28px_156px]">
              <div aria-hidden />
              <div className="h-6 flex items-center justify-between px-[14px]">
                {Array.from({ length: 5 }, (_, idx) => (
                  <span key={`bottom-mark-${sectionIndex}-${idx}`} className="w-2 h-6 bg-[#090909]" />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (footerType === "subjectiveGuide") {
      return (
        <div className="grid grid-cols-[1fr] h-[20px] mt-[3px]">
          <div className="text-center font-['Pretendard'] font-semibold text-[17px] leading-[100%] tracking-[0px] text-[#858585]">
            {subjectiveGuideText}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`rounded-[32px] bg-[#FFFDF1] shadow-[0px_4px_16px_0px_#00000026] ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className={`${paddingClassName} ${contentClassName}`}>
        {children}
        {renderFooter()}
      </div>
    </div>
  );
}
