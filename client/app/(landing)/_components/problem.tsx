"use client"

import { useEffect, useRef } from "react"
import { Layers, Clock, UserX } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"

const problemIcons = {
  overload: Layers,
  screening: Clock,
  missed: UserX,
}

export function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  const problems = [
    {
      icon: problemIcons.overload,
      key: 'overload',
      title: t('problem.items.overload.title'),
      description: t('problem.items.overload.description'),
    },
    {
      icon: problemIcons.screening,
      key: 'screening',
      title: t('problem.items.screening.title'),
      description: t('problem.items.screening.description'),
    },
    {
      icon: problemIcons.missed,
      key: 'missed',
      title: t('problem.items.missed.title'),
      description: t('problem.items.missed.description'),
    },
  ]

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
            {t('problem.label')}
          </p>
          <h2
            data-animate
            className="animate-fade-in-up animation-delay-100 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            {t('problem.title')}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {problems.map((problem, index) => (
            <div
              key={problem.key}
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
