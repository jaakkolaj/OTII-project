"use client"

import { useEffect, useRef } from "react"
import { X, Check } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"

export function Comparison() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  const atsFeatures = [
    t('comparison.atsFeatures.feature1'),
    t('comparison.atsFeatures.feature2'),
    t('comparison.atsFeatures.feature3'),
  ]

  const rankwiseFeatures = [
    t('comparison.rankwiseFeatures.feature1'),
    t('comparison.rankwiseFeatures.feature2'),
    t('comparison.rankwiseFeatures.feature3'),
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
    <section id="comparison" ref={sectionRef} className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p
            data-animate
            className="animate-fade-in-up mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            {t('comparison.label')}
          </p>
          <h2
            data-animate
            className="animate-fade-in-up animation-delay-100 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            {t('comparison.title')}
          </h2>
        </div>

        <div
          data-animate
          className="animate-fade-in-up animation-delay-200 mx-auto grid max-w-4xl gap-6 md:grid-cols-2"
        >
          {/* Traditional ATS */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <X className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{t('comparison.ats')}</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {atsFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted">
                    <X className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RankWise AI */}
          <div className="rounded-2xl border-2 border-foreground bg-foreground p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/10">
                <Check className="h-5 w-5 text-background" />
              </div>
              <h3 className="font-display text-lg font-semibold text-background">{t('comparison.rankwise')}</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {rankwiseFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background/20">
                    <Check className="h-3 w-3 text-background" />
                  </div>
                  <span className="text-background/90">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
