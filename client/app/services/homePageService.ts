import "server-only";

import { authFetch } from "@/lib/authFetch";
const baseUrl = "http://localhost:5001/candidates";

export const getCandidatesInReview = async () => {
  const response = await authFetch(`${baseUrl}/user`, {
    method: "GET",
  });
  if (!response.ok) throw new Error(`Failed to get candidates: ${response.status}`);

  return response.json();
};