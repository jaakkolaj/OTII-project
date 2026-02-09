import axios from 'axios';

const baseUrl = 'http://localhost:5001';

// Define the JobPosting interface
interface JobPosting {
    title: string;
    department: string;
    location: string;
    employmentType: string;
    seniority: string;
    salaryRange: string;
    description: string;
    requirements: string;
    closingDate: string;
}

// Create a new job posting
export const createJobPosting = async (jobPosting: JobPosting) => {
  const response = await axios.post(`${baseUrl}/job-postings`, jobPosting, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
  });
  return response.data;
};

// Fetch all job postings
export const getJobPostings = async () => {
  const response = await axios.get(`${baseUrl}/job-postings`, {
    withCredentials: true
  });
  return response;
};

// Delete job posting
export const deleteJobPosting = async (jobId: any) => {
  const response = await axios.delete(`${baseUrl}/job-postings/${jobId}`, {
    withCredentials: true
  });
  return response;
}

// Get job posting by ID
export const getJobPostingById = async (jobId: any) => {
  const response = await axios.get(`${baseUrl}/job-postings/${jobId}`, {
    withCredentials: true
  });
  return response;
};

// Edit existing job osting
export const editJobPostingById = async (jobId: any, jobPosting: JobPosting) => {
  const response = await axios.put(`${baseUrl}/job-postings/${jobId}`, jobPosting, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  return response;
};
