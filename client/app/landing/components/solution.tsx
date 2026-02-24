"use client"

import { useEffect, useRef } from "react"
import { Brain, Zap, FileText, Timer } from "lucide-react"

const benefits = [
  {
    icon: Brain,
    title: "Intelligent Matching",
    description: "AI compares candidates directly to your job requirements.",
  },
  {
    icon: Zap,
    title: "Instant Ranking",
    description: "See who fits best — immediately.",
  },
  {
    icon: FileText,
    title: "Explainable Results",
    description: "Clear reasoning behind every ranking decision.",
  },
  {
    icon: Timer,
    title: "Time Saved",
    description: "Reduce screening time by up to 80%.",
  },
]

export function Solution() {
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
    <section id="solution" ref={sectionRef} className="border-b border-border bg-card py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <p
            data-animate
            className="animate-fade-in-up mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            The Solution
          </p>
          <h2
            data-animate
            className="animate-fade-in-up animation-delay-100 mb-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            Let AI Handle the Screening
          </h2>
          <p
            data-animate
            className="animate-fade-in-up animation-delay-200 text-lg leading-relaxed text-muted-foreground"
          >
            RankWise AI analyzes every applicant against your job description and delivers a ranked, explainable
            shortlist in seconds.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              data-animate
              className={`animate-fade-in-up animation-delay-${(index + 3) * 100} group rounded-2xl border border-border bg-background p-8 transition-shadow hover:shadow-lg`}
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary transition-colors group-hover:bg-foreground">
                <benefit.icon className="h-5 w-5 text-foreground transition-colors group-hover:text-background" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
