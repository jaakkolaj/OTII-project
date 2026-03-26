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

export type ResumeCandidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  strengths: string[];
  weaknesses: string[];
  topSkills: string[];
  score: number;
  rank: number;
  pdfUrl: string;
  status: CandidateStatus;
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
