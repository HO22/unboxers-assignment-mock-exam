import type { StudentInfo } from "../../types/exam";
import logoBlueUrl from "../../assets/logo-blue.svg";

interface ExamSideInfoPanelProps {
  examTitle?: string;
  subjectName?: string;
  supervisorName?: string;
  studentInfo: StudentInfo;
}

const INFO_ROWS = [
  { label: "시\n험", key: "examTitle" as const },
  { label: "과\n목", key: "subject" as const },
  { label: "성\n명", key: "name" as const },
  { label: "학\n교", key: "school" as const },
  { label: "좌\n석", key: "seat" as const },
  { label: "감\n독", key: "proctor" as const },
];

export default function ExamSideInfoPanel({
  examTitle = "TEN-UP 모의고사",
  subjectName = "공통수학2",
  supervisorName = "배이수",
  studentInfo,
}: ExamSideInfoPanelProps) {
  const gradeOptions = [1, 2, 3];
  const numberOptions = Array.from({ length: 10 }, (_, idx) => idx);
  const safeStudentNumber = Math.max(0, studentInfo.studentNumber || 0);
  const tensDigit = Math.floor(safeStudentNumber / 10) % 10;
  const onesDigit = safeStudentNumber % 10;
  const omrOptionBaseClass =
    "h-[44px] w-5 rounded-[12px] flex items-center justify-center font-['Pretendard'] font-bold text-[12px] leading-[16px] tracking-[0px] text-center";

  const values = {
    examTitle,
    subject: subjectName,
    name: studentInfo.name || "-",
    school: studentInfo.school || "-",
    seat: `${studentInfo.seatNumber || "-"}번`,
    proctor: supervisorName,
  } as const;
  const detailRows = INFO_ROWS.map((row) => ({
    label: row.label,
    value: values[row.key],
  }));

  return (
    <aside className="h-[615px] bg-[##FFFDF1]">
      <div className="flex">
        <div className="mr-[-1px] w-[200px]">
          {detailRows.map((row, index) => {
            return (
              <div key={row.label} className="grid h-10 grid-cols-[28px_172px]">
                <div
                  className={`border-l-[1.5px] border-t-[1.5px] border-[#5784F1] grid place-items-center ${index === detailRows.length - 1 ? "border-b-[1.5px]" : ""
                    }`}
                >
                  <span className="whitespace-pre font-['Pretendard'] font-semibold text-[14px] leading-[100%] tracking-[0px] text-center text-[#364F8E]">
                    {row.label}
                  </span>
                </div>
                <div
                  className={`border-l-[1.5px] border-r-[1.5px] border-t-[1.5px] border-[#5784F1] flex items-center justify-center ${index === detailRows.length - 1 ? "border-b-[1.5px]" : ""
                    }`}
                >
                  <span className="font-['Pretendard'] font-bold text-[17px] leading-[100%] tracking-[0px] text-center text-[#364F8E]">
                    {row.value}
                  </span>
                </div>
              </div>
            );
          })}
          <div className="flex flex-1 flex-col py-16 px-2 gap-4 text-center word-break">
            <div className="mx-auto mb-4 grid place-items-center">
              <img src={logoBlueUrl} alt="" aria-hidden />
            </div>
            <p className="font-['Pretendard'] font-bold text-[24px] leading-[100%] tracking-[0px] text-center text-[#364F8E]">
              학생답안 입력용{"\n"}OMR 카드
            </p>
            <p className="mt-4 font-['Pretendard'] font-semibold text-[12px] leading-[100%] tracking-[0px] text-center text-[#364F8E]">
              객관식 답안은 터치해서 칠하고, 주관식 답안은 터치한 뒤 키패드로 입력해요.
            </p>
            <p className="mt-3 font-['Pretendard'] font-semibold text-[12px] leading-[100%] tracking-[0px] text-center text-[#364F8E]">
              답안을 작성하지 않고 제출하면 별도의 경고 없이 오답으로 처리되니 주의하세요.
            </p>
          </div>
        </div>
        <div>
          <div className="grid h-10 grid-cols-[36px_66px]">
            <div className="border-l-[1.5px] border-t-[1.5px] border-[#5784F1] grid place-items-center">
              <span className="font-['Pretendard'] font-semibold text-[14px] leading-[100%] tracking-[0px] text-center text-[#364F8E] whitespace-pre">
                학{"\n"}년
              </span>
            </div>
            <div className="border-l-[1.5px] border-r-[1.5px] border-t-[1.5px] border-[#5784F1] grid place-items-center">
              <span className="font-['Pretendard'] font-semibold text-[17px] leading-[100%] tracking-[0px] text-center text-[#364F8E]">
                번호
              </span>
            </div>
          </div>

          <div className="grid h-[572px] grid-cols-[36px_66px]">
            <div className="border-l-[1.5px] border-b-[1.5px] border-t-[1.5px] border-[#5784F1]">
              <div className="flex flex-col items-center gap-3 pt-3">
                {gradeOptions.map((grade) => {
                  const isActive = studentInfo.grade === grade;
                  return (
                    <div
                      key={`grade-option-${grade}`}
                      className={`${omrOptionBaseClass} ${isActive ? "bg-[#090909] text-white" : "bg-[#A5A4A0] text-white"}`}
                    >
                      {grade}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-l-[1.5px] border-r-[1.5px] border-t-[1.5px] border-b-[1.5px] border-[#5784F1]">
              <div className="flex items-start justify-center gap-[10px] pt-3 pb-3">
                <div className="flex flex-col gap-3">
                  {numberOptions.map((number) => {
                    const isActive = tensDigit === number;
                    return (
                      <div
                        key={`tens-option-${number}`}
                        className={`${omrOptionBaseClass} ${isActive ? "bg-[#090909] text-white" : "bg-[#A5A4A0] text-white"}`}
                      >
                        {number}
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col gap-3">
                  {numberOptions.map((number) => {
                    const isActive = onesDigit === number;
                    return (
                      <div
                        key={`ones-option-${number}`}
                        className={`${omrOptionBaseClass} ${isActive ? "bg-[#090909] text-white" : "bg-[#A5A4A0] text-white"}`}
                      >
                        {number}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[2px] grid grid-cols-[36px_66px]">
            <div className="mt-[2px] h-6 flex items-center justify-center">
              <span className=" w-2 h-6 bg-[#090909]" />
            </div>
            <div className="mt-[2px] h-6 flex items-center justify-center gap-[10px]">
              {Array.from({ length: 2 }, (_, lineIndex) => (
                <span key={`number-bottom-mark-${lineIndex}`} className="w-2 h-6 bg-[#090909]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
