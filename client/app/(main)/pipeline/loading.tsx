import { Skeleton } from "@/components/ui/skeleton";

export default function PipelineLoading() {
  return (
    <main className="container mx-auto flex flex-col gap-8 p-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
      <Skeleton className="h-16 w-full rounded-2xl" />
      <div className="flex gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-64 rounded-2xl" />
        ))}
      </div>
    </main>
  );
}
