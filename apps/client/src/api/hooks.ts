import { useQuery, useMutation } from "@tanstack/react-query";
import { getExamInfo, submitExam } from "./exam";
import type { ExamSubmission } from "../types/exam";

export function useExamInfo() {
  return useQuery({
    queryKey: ["exam-info"],
    queryFn: getExamInfo,
  });
}

export function useSubmitExam() {
  return useMutation({
    mutationFn: (submission: ExamSubmission) => submitExam(submission),
  });
}
