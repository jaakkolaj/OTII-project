import { Skeleton } from "@/components/ui/skeleton";

export default function CandidateDetailLoading() {
  return (
    <main className="container mx-auto flex flex-col gap-6 p-8">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-4 w-20" />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    </main>
  );
}
