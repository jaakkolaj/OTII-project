export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  seniority: string;
  salaryRange: string;
  description: string;
  requirements: string;
  closingDate: string;

  //Mahdolliset kentät mitä lisätään (mitä oli frontissa, mutta ei tietokannassa)
  status?: "Open" | "Paused" | "Closed"; 
  applicants?: number;
  lastUpdated?: string;
}

// Tämä on hyödyllinen tyyppi, kun luodaan uusi työpaikkailmoitus ilman id:tä, joka luodaan backendissä.
export type CreateJobPostingInput = Omit<JobPosting, 'id' >;

