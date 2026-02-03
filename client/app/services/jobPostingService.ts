import axios from 'axios';

const baseUrl = 'http://localhost:5000';

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
    }
  });
  return response.data;
};

// Fetch all job postings
export const getJobPostings = async () => {
  try {
    const response = await axios.get(`${baseUrl}/job-postings`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}