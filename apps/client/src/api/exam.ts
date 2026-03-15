import type { ExamInfoResponse, ExamSubmission, ExamSubmissionResponse } from "../types/exam";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export async function getExamInfo(): Promise<ExamInfoResponse> {
  const response = await fetch(`${API_BASE_URL}/api/exams`);
  if (!response.ok) {
    throw new Error("Failed to fetch exam info");
  }
  return response.json();
}

export async function submitExam(submission: ExamSubmission): Promise<ExamSubmissionResponse> {
  const response = await fetch(`${API_BASE_URL}/api/exams/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submission),
  });
  if (!response.ok) {
    throw new Error("Failed to submit exam");
  }
  return response.json();
}
