import "server-only";

import { authFetch } from "@/lib/auth/authFetch";
const baseUrl = "http://localhost:5001";

export const getCandidatesInReview = async () => {
  const response = await authFetch(`${baseUrl}/candidates/user`, {
    method: "GET",
  });
  if (!response.ok) throw new Error(`Failed to get candidates: ${response.status}`);

  return response.json();
};

export const getTasks = async () => {
  const response = await authFetch(`${baseUrl}/tasks`, {
    method: 'GET'
  })
  if (!response.ok) throw new Error(`Failed to get tasks: ${response.status}`);

  return response.json();
};

export const createTask = async (task: string) => {
  const response = await authFetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });
  if (!response.ok) throw new Error(`Failed to create tasks: ${response.status}`);

  return response.json();
};

export const deleteTask = async (taskId: string) => {
  const response = await authFetch(`${baseUrl}/tasks/${taskId}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error(`Failed to delete task: ${response.status}`);

  return { success: true };
};
