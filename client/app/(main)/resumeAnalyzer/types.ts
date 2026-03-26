export type ResumeJobPosting = {
  id: string;
  title: string;
  description: string;
  location: string;
  applicants?: number;
  status?: "Open" | "Paused" | "Closed";
  lastUpdated?: string;
};

export type CandidateStatus =
  | "NEW"
  | "SCREENING"
  | "INTERVIEW"
  | "OFFER"
  | "ACCEPTED"
  | "REJECTED";

export type KanbanCandidate = {
  id: string;
  name: string;
  email: string;
  score?: number;
  topSkills?: string[];
  status: CandidateStatus;
};

export type ResumeCandidate = KanbanCandidate & {
  phone: string;
  position: string;
  strengths: string[];
  weaknesses: string[];
  score: number;
  topSkills: string[];
  rank: number;
  pdfUrl: string;
};

export type AiAnalysis = {
  id: string,
  candidate_id: string,
  skills: JSON,
  years_expericene: GLfloat,
  education_level: string,
  keyword_matches: JSON,
  strengths: JSON,
  weaknesses: JSON,
  summary: string,
  raw_ai_response: JSON
}
