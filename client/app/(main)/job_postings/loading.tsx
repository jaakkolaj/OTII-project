export default function Loading() {
  return (
    <main className="container mx-auto flex flex-col gap-8 p-8">
      <div className="space-y-2">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        <div className="h-8 w-72 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-muted" />
      </div>

      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="h-11 w-full max-w-md animate-pulse rounded-full bg-muted" />
      </section>

      <section className="space-y-4">
        <div className="h-28 animate-pulse rounded-2xl border bg-card" />
        <div className="h-28 animate-pulse rounded-2xl border bg-card" />
        <div className="h-28 animate-pulse rounded-2xl border bg-card" />
      </section>
    </main>
  );
}
