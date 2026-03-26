"use client"

import { useEffect, useRef } from "react"
import { useLanguage } from "@/lib/language-provider"

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  const steps = [
    {
      number: t('howItWorks.items.step1.number'),
      key: 'step1',
      title: t('howItWorks.items.step1.title'),
      description: t('howItWorks.items.step1.description'),
    },
    {
      number: t('howItWorks.items.step2.number'),
      key: 'step2',
      title: t('howItWorks.items.step2.title'),
      description: t('howItWorks.items.step2.description'),
    },
    {
      number: t('howItWorks.items.step3.number'),
      key: 'step3',
      title: t('howItWorks.items.step3.title'),
      description: t('howItWorks.items.step3.description'),
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
    <section id="how-it-works" ref={sectionRef} className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p
            data-animate
            className="animate-fade-in-up mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            {t('howItWorks.label')}
          </p>
          <h2
            data-animate
            className="animate-fade-in-up animation-delay-100 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            {t('howItWorks.title')}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.key}
              data-animate
              className={`animate-fade-in-up animation-delay-${(index + 2) * 100} relative`}
            >
              <div className="mb-6">
                <span className="font-display text-6xl font-bold text-border">{step.number}</span>
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-px w-16 bg-border lg:block" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
