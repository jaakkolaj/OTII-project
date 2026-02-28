"use client";

import { useState, useMemo, useTransition } from "react";
import { CandidatesHeader } from "./components/CandidatesHeader";
import { CandidatesToolbar } from "./components/CandidatesToolbar";
import { CandidatesList } from "./components/CandidatesList";
import { runAnalysisAction, deleteAllAnalysisAction } from "./actions";
import { toast } from "sonner";

export default function ResumeAnalyzerClient({ jobId, jobTitle, initialCandidates }: any) {
  const [query, setQuery] = useState("");

  // Käytetään useTransitionia, jotta voimme näyttää välitilan analyysin käskyjen aikana ilman, että koko UI lukkiutuu.
  const [isPending, startTransition] = useTransition(); 

  // Käsky analyysin käynnistämiseen ja kaikkien analyysien poistamiseen, jotka molemmat revalidatoi datan uudelleen haettaessa.
  const handleRunAnalysis = () => {
    startTransition(async () => {
      try {
        await runAnalysisAction(jobId);
        toast.success("Analyysi valmis!");
      } catch (e) {
        toast.error("Virhe analyysissä");
      }
    });
  };
  const handleDeleteAll = () => {
    startTransition(async () => {
      await deleteAllAnalysisAction(jobId);
      toast.success("Kaikki analyysit on poistettu");
    });
  };
  
  const filteredCandidates = useMemo(() => {
    const term = query.toLowerCase();
    return initialCandidates.filter((c: any) => 
      c.name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term)
    );
  }, [initialCandidates, query]);

  return (
      <main className="container mx-auto flex flex-col gap-8 p-8">
        <CandidatesHeader 
          jobTitle={jobTitle} 
          total={filteredCandidates.length} 
          onRunAnalysis={handleRunAnalysis} 
          onDeleteAll={handleDeleteAll} 
          isLoading={isPending} // isPending on true, kun Action on käynnissä
        />
        <CandidatesToolbar query={query} onQueryChange={setQuery} />
        <CandidatesList candidates={filteredCandidates} />
      </main>
  );
}