import "server-only";

import { authFetch } from "@/lib/auth/authFetch";

const baseUrl = "http://localhost:5001/candidates";

export const updateCandidateStatus = async (
  candidateId: string,
  status: string
) => {
  const response = await authFetch(`${baseUrl}/${candidateId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!response.ok)
    throw new Error(`Statuksen päivitys epäonnistui: ${response.status}`);

  return response.json();
};
