import "server-only";
import { authFetch } from "@/lib/authFetch";

const baseUrl = "http://localhost:5001/users";

export const changeEmail = async (email: string) => {
  const response = await authFetch(`${baseUrl}/change/email`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error(`Email change failed: ${response.status}`);
  }

  return response.json();
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const response = await authFetch(`${baseUrl}/change/password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  if (!response.ok) {
    throw new Error(`Password change failed: ${response.status}`);
  }

  return response.json();
};
