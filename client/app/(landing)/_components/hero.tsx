"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

function HeroIllustration() {
  return (
    <div className="relative flex items-center justify-center" aria-hidden="true">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-72 w-72 md:h-96 md:w-96"
      >
        {/* Abstract ranking bars */}
        <rect x="60" y="220" width="40" height="120" rx="8" fill="hsl(0 0% 12%)" />
        <rect x="120" y="160" width="40" height="180" rx="8" fill="hsl(0 0% 20%)" />
        <rect x="180" y="100" width="40" height="240" rx="8" fill="hsl(0 0% 8%)" />
        <rect x="240" y="180" width="40" height="160" rx="8" fill="hsl(0 0% 25%)" />
        <rect x="300" y="240" width="40" height="100" rx="8" fill="hsl(0 0% 15%)" />

        {/* AI network nodes */}
        <circle cx="80" cy="80" r="6" fill="hsl(0 0% 30%)" />
        <circle cx="200" cy="50" r="8" fill="hsl(0 0% 15%)" />
        <circle cx="320" cy="90" r="5" fill="hsl(0 0% 35%)" />
        <circle cx="140" cy="60" r="4" fill="hsl(0 0% 40%)" />
        <circle cx="260" cy="70" r="5" fill="hsl(0 0% 25%)" />

        {/* Connection lines */}
        <line x1="80" y1="80" x2="140" y2="60" stroke="hsl(0 0% 75%)" strokeWidth="1" opacity="0.4" />
        <line x1="140" y1="60" x2="200" y2="50" stroke="hsl(0 0% 75%)" strokeWidth="1" opacity="0.4" />
        <line x1="200" y1="50" x2="260" y2="70" stroke="hsl(0 0% 75%)" strokeWidth="1" opacity="0.4" />
        <line x1="260" y1="70" x2="320" y2="90" stroke="hsl(0 0% 75%)" strokeWidth="1" opacity="0.4" />
        <line x1="80" y1="80" x2="200" y2="50" stroke="hsl(0 0% 75%)" strokeWidth="1" opacity="0.2" />
        <line x1="200" y1="50" x2="320" y2="90" stroke="hsl(0 0% 75%)" strokeWidth="1" opacity="0.2" />

        {/* Ranking indicator arrow */}
        <path d="M195 370 L200 360 L205 370" stroke="hsl(0 0% 40%)" strokeWidth="2" fill="none" />
        <line x1="200" y1="360" x2="200" y2="345" stroke="hsl(0 0% 40%)" strokeWidth="2" />
      </svg>
    </div>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 }
    )

    const children = sectionRef.current?.querySelectorAll("[data-animate]")
    children?.forEach((child) => observer.observe(child))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden border-b border-border pt-20"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:py-32">
        <div className="flex flex-col gap-8">
          <div data-animate className="animate-fade-in-up">
            <span className="inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              AI-Powered Screening
            </span>
          </div>

          <h1
            data-animate
            className="animate-fade-in-up animation-delay-100 font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            <span className="text-balance">Too Many CVs. Not Enough Time.</span>
          </h1>

          <p
            data-animate
            className="animate-fade-in-up animation-delay-200 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            RankWise AI screens and ranks job applicants instantly — so you can focus on hiring, not reading.
          </p>

          <div
            data-animate
            className="animate-fade-in-up animation-delay-300 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              className="rounded-full bg-foreground px-8 text-base text-background hover:bg-foreground/90"
            >
              Get Early Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-border px-8 text-base text-foreground hover:bg-accent"
            >
              Book a Demo
            </Button>
          </div>
        </div>

        <div data-animate className="animate-fade-in-up animation-delay-400 flex justify-center">
          <HeroIllustration />
        </div>
      </div>
    </section>
  )
}
