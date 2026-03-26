import "server-only";

import type { JobPosting, CreateJobPostingInput } from "@/app/types/jobPosting";
import { authFetch } from "@/lib/authFetch";

const baseUrl = "http://localhost:5001";


// Create a new job posting
export const createJobPosting = async (jobPosting: CreateJobPostingInput): Promise<CreateJobPostingInput> => {
  const response = await authFetch(`${baseUrl}/job-postings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobPosting),
  });

  if (!response.ok) throw new Error(`Failed to create job: ${response.statusText}`);
  return response.json();
};

// Fetch all job postings
export const getJobPostings = async (): Promise<JobPosting[]> => {
  const response = await authFetch(`${baseUrl}/job-postings`, {
    method: "GET",
  });

  if (!response.ok) throw new Error(`Failed to fetch jobs: ${response.statusText}`);
  return response.json();
};

// Delete job posting
export const deleteJobPosting = async (jobId: string) => {
  const response = await authFetch(`${baseUrl}/job-postings/${jobId}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error(`Failed to delete job: ${response.statusText}`);
  return response; // Palautetaan koko response, kuten alkuperäisessä koodissa
};

// Get job posting by ID
export const getJobPostingById = async (jobId: string): Promise<JobPosting> => {
  const response = await authFetch(`${baseUrl}/job-postings/${jobId}`, {
    method: "GET",
  });

  if (!response.ok) throw new Error(`Failed to fetch job: ${response.statusText}`);
  return response.json();
};

// Edit existing job posting
export const editJobPostingById = async (
  jobId: string,
  jobPosting: CreateJobPostingInput,
): Promise<JobPosting> => {
  const response = await authFetch(`${baseUrl}/job-postings/${jobId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobPosting),
  });

  if (!response.ok) throw new Error(`Failed to update job: ${response.statusText}`);
  return response.json();
};
