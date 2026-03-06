export interface AiAnalysis {
  id: string,
  candidate_id: string,
  skills: JSON,
  years_experience: number,
  education_level: string,
  keyword_matches: JSON,
  strengths: JSON,
  weaknesses: JSON,
  summary: string,
  raw_ai_response: JSON
}