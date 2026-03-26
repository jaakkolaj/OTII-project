import "server-only";

import { authFetch } from "@/lib/auth/authFetch";

const baseUrl = "http://localhost:5001/candidates";

export const getAllCandidates = async () => {
  const response = await authFetch(`${baseUrl}/user`, { method: "GET" });
  if (!response.ok) throw new Error(`Failed to get candidates: ${response.status}`);
  return response.json();
};

export const getCandidateById = async (candidateId: string) => {
  const response = await authFetch(`${baseUrl}/${candidateId}`, { method: "GET" });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Failed to get candidate: ${response.status}`);
  return response.json();
};

export const createNote = async (candidateId: string, content: string) => {
  const response = await authFetch(`${baseUrl}/${candidateId}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) throw new Error(`Failed to create note: ${response.status}`);
  return response.json();
};

export const deleteNote = async (candidateId: string, noteId: string) => {
  const response = await authFetch(`${baseUrl}/${candidateId}/notes/${noteId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Failed to delete note: ${response.status}`);
  return response.json();
};

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
