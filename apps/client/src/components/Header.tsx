import { Link } from "react-router-dom";
import logoUrl from "../assets/logo.svg";
import downArrowUrl from "../assets/down-arrow.svg";

interface HeaderProps {
  title?: string;
  studentName?: string;
}

export default function Header({ title = "모의고사 모드", studentName }: HeaderProps) {
  const titleTextClass =
    "font-['Pretendard'] font-bold text-[20px] leading-[100%] tracking-[-0.41px] text-center";
  const headerTextClass =
    "font-['Pretendard'] font-bold text-[17px] leading-[100%] tracking-[-0.41px] text-center";

  return (
    <header className="flex items-center justify-between h-[65px] px-4 sm:px-6 bg-white border-b border-gray-200 shrink-0 z-[999]">
      <div className="flex flex-1 items-center min-w-0 w-[180px]">
        <Link to="/" className="flex items-center gap-3 min-w-0" aria-label="홈으로">
          <img src={logoUrl} alt="" className="w-10 h-10 shrink-0" />
        </Link>
      </div>

      <h1 className={`${titleTextClass} flex-1 text-gray-900 truncate px-2`}>
        {title}
      </h1>

      <div className="flex flex-1 items-center gap-4 shrink-0 min-w-[180px] justify-end">
        <div
          className="flex-none flex items-center text-left gap-[12px] w-[180px] h-11 pl-4 pr-4 rounded-[10px] border border-gray-200 bg-white"
          style={{ boxShadow: "0px 8px 16px 0px #00000008" }}
        >
          <span
            className={`${headerTextClass} flex-1 text-gray-900 truncate`}
            title={studentName}
          >
            {studentName ?? "학생"}
          </span>
          <img src={downArrowUrl} alt="" className="w-[7px] h-[6px] shrink-0" aria-hidden />
        </div>
        <Link
          to="/"
          className={`${headerTextClass} inline-flex items-center justify-center h-11 pl-4 pr-4 rounded-[10px] border border-gray-200 bg-white text-gray-700 hover:text-gray-900 whitespace-nowrap`}
          style={{ boxShadow: "0px 8px 16px 0px #00000008" }}
        >
          홈으로
        </Link>
      </div>
    </header>
  );
}
