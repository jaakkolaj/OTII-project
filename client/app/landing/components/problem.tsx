"use client"

import { useEffect, useRef } from "react"
import { Layers, Clock, UserX } from "lucide-react"

const problems = [
  {
    icon: Layers,
    title: "Application Overload",
    description: "Recruiters receive hundreds of CVs for a single role.",
  },
  {
    icon: Clock,
    title: "Manual Screening",
    description: "Reviewing applications takes hours — sometimes days.",
  },
  {
    icon: UserX,
    title: "Missed Talent",
    description: "The best candidates are overlooked due to time pressure.",
  },
]

export function Problem() {
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
    <section id="problem" ref={sectionRef} className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p
            data-animate
            className="animate-fade-in-up mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            The Problem
          </p>
          <h2
            data-animate
            className="animate-fade-in-up animation-delay-100 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            Recruiting Is Broken
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              data-animate
              className={`animate-fade-in-up animation-delay-${(index + 2) * 100} rounded-2xl border border-border bg-card p-8`}
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground">
                <problem.icon className="h-5 w-5 text-background" />
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold text-foreground">{problem.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
