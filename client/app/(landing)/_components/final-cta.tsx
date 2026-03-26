"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
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
      className="bg-foreground py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          data-animate
          className="animate-fade-in-up mb-6 font-display text-4xl font-bold tracking-tight text-background md:text-5xl lg:text-6xl"
        >
          <span className="text-balance">Hire in Minutes. Not Days.</span>
        </h2>
        <p
          data-animate
          className="animate-fade-in-up animation-delay-100 mb-10 text-lg text-background/60"
        >
          Stop reading CVs manually. Start hiring smarter.
        </p>
        <div data-animate className="animate-fade-in-up animation-delay-200">
          <Button
            size="lg"
            className="rounded-full bg-background px-8 text-base text-foreground hover:bg-background/90"
          >
            Request Access
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
