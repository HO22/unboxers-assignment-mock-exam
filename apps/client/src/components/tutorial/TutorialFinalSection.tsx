import problemIconUrl from "../../assets/problem.svg";

export default function TutorialFinalSection() {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full gap-12 mb-12 rounded-2xl bg-white shadow-[0px_4px_16px_0px_#00000026] px-[60px] py-[35px] flex items-start justify-between">
        <div className="flex flex-1 flex-col">
          <p className="font-['Pretendard'] font-semibold text-[20px] leading-[100%] bg-[linear-gradient(90deg,#333333_0%,#585858_100%)] bg-clip-text text-transparent">
            시험 종료까지 남은 시간
          </p>
          <div className="flex items-end mt-2">
            <span className="font-['Pretendard'] font-extrabold text-[48px] leading-[100%] text-[#F44C47]">
              5초
            </span>
            <span className="ml-auto font-['Pretendard'] font-semibold text-[17px] leading-[100%] tracking-[0.36px] text-[#585858]">
              시험 시간 60분
            </span>
          </div>
          <div className="mt-2 h-2 w-full rounded-[4px] bg-[#F5F5F5] overflow-hidden">
            <div className="h-full w-[38px] bg-[#F44C47]" />
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
          <button
            type="button"
            className="w-[200px] h-[60px] rounded-2xl bg-[linear-gradient(90deg,#364F8E_0%,#5784F1_100%)] text-white font-['Pretendard'] font-semibold text-[17px] shadow-[0px_8px_16px_0px_#00000008]"
          >
            답안 제출하기
          </button>
        </div>
      </div>
      <p className="mt-4 font-['Pretendard'] font-extrabold text-[36px] leading-[100%] tracking-[0.36px] text-center text-[#090909]">
        시간이 모두 지나면 시험은 종료되고 OMR카드는 자동으로 제출돼요
      </p>
      <p className="mt-4 font-['Pretendard'] font-extrabold text-[36px] leading-[100%] tracking-[0.36px] text-center text-[#F44C47]">
        마킹하지 못한 답안은 모두 오답 처리되니 미리 마킹하세요
      </p>
    </div>
  );
}
