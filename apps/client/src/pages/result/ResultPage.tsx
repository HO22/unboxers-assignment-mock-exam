import { useLocation, useNavigate } from "react-router-dom";
import type { ExamResult } from "../../types/exam";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as ExamResult | undefined;

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-xl mb-4">결과 데이터가 없습니다.</div>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          처음으로
        </button>
      </div>
    );
  }

  const objectiveResults = result.results.filter((r) => r.answerType === "objective");
  const subjectiveResults = result.results.filter((r) => r.answerType === "subjective");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold mb-2">{result.title}</h1>
          <p className="text-gray-600 mb-6">시험 결과</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{result.score}점</div>
              <div className="text-gray-600 mt-2">총점</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{result.correctCount}</div>
              <div className="text-gray-600 mt-2">정답</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600">{result.wrongCount}</div>
              <div className="text-gray-600 mt-2">오답</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-600">{result.unansweredCount}</div>
              <div className="text-gray-600 mt-2">미응답</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">객관식 결과</h2>
            <div className="grid grid-cols-7 gap-2">
              {objectiveResults.map((item) => (
                <div
                  key={item.number}
                  className={`p-3 rounded-lg text-center font-semibold ${
                    item.result === "correct"
                      ? "bg-green-100 text-green-700"
                      : item.result === "wrong"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.number}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">주관식 결과</h2>
            <div className="grid grid-cols-6 gap-2">
              {subjectiveResults.map((item) => (
                <div
                  key={item.number}
                  className={`p-3 rounded-lg text-center font-semibold ${
                    item.result === "correct"
                      ? "bg-green-100 text-green-700"
                      : item.result === "wrong"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.number}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-6 bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          처음으로
        </button>
      </div>
    </div>
  );
}
