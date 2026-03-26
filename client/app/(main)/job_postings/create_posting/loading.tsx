export default function Loading() {
  return (
    <main className="container mx-auto flex flex-col gap-8 p-8">
      <div className="space-y-3">
        <div className="h-8 w-72 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-muted" />
      </div>

      <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-5">
        <div className="h-11 w-full animate-pulse rounded-xl bg-muted" />
        <div className="h-11 w-full animate-pulse rounded-xl bg-muted" />
        <div className="h-11 w-full animate-pulse rounded-xl bg-muted" />
        <div className="h-28 w-full animate-pulse rounded-xl bg-muted" />
      </section>
    </main>
  );
}
