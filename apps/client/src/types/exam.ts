export interface ExamInfo {
  title: string;
  description: string;
  supervisorName: string;
  totalQuestions: number;
  totalScore: number;
}

export interface ExamInfoResponse {
  message: string;
  data: ExamInfo;
}

export type AnswerType = "objective" | "subjective";

export interface Answer {
  answerType: AnswerType;
  number: number;
  answer: number;
}

export interface StudentInfo {
  name: string;
  school: string;
  grade: number;
  studentNumber: number;
  seatNumber: number;
}

export interface ExamSubmission extends StudentInfo {
  answers: Answer[];
}

export type AnswerResult = "correct" | "wrong" | "unanswered";

export interface QuestionResult {
  answerType: AnswerType;
  number: number;
  result: AnswerResult;
}

export interface ExamResult {
  title: string;
  score: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  results: QuestionResult[];
}

export interface ExamSubmissionResponse {
  message: string;
  data: ExamResult;
}
