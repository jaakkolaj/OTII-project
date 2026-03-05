export default function Loading() {
  return (
    <main className="container mx-auto flex flex-col gap-6 p-8">
      <div className="space-y-2">
        <div className="h-4 w-44 animate-pulse rounded bg-muted" />
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full max-w-xl animate-pulse rounded bg-muted" />
      </div>

      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="h-10 w-full animate-pulse rounded bg-muted" />
      </section>

      <section className="grid gap-6">
        <div className="h-44 animate-pulse rounded-2xl border bg-card" />
        <div className="h-44 animate-pulse rounded-2xl border bg-card" />
      </section>
    </main>
  );
}
