"use client";
import Link from "next/link";

export default function JobPostingsList() {
  const jobs = [
    { id: "1", title: "Backend Developer" },
    { id: "2", title: "Frontend Developer" },
    { id: "3", title: "Full Stack Developer"},
    { id: "4", title: "DevOps Engineer" },
    { id: "5", title: "Data Scientist" },
    { id: "6", title: "Product Manager" },
    { id: "7", title: "UX/UI Designer" },
    { id: "8", title: "QA Engineer" },
    { id: "9", title: "Mobile Developer" },
    { id: "10", title: "Cloud Architect" }
  ];

  return (
    <main className="container mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-bold">Job Postings</h1>
      <ul className="space-y-2">
        {jobs.map((job) => (
          <li key={job.id}>
            <Link
              href={`/job_postings/${job.id}`}
              className="text-blue-600 hover:underline"
            >
              {job.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
