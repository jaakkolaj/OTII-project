export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="font-display text-lg font-bold text-foreground">RankWise AI</span>
          <span className="text-sm text-muted-foreground">AI-powered candidate screening.</span>
        </div>

        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Product
          </a>
          <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </a>
          <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </a>
          <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Privacy
          </a>
        </nav>

        <p className="text-sm text-muted-foreground">
          {"© 2026 RankWise AI"}
        </p>
      </div>
    </footer>
  )
}
