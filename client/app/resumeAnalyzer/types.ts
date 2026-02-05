export type ResumeJobPosting = {
  id: string;
  title: string;
  description: string;
  applicants: number;
  location: string;
  status: "Open" | "Paused" | "Closed";
  lastUpdated: string;
};

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
};
