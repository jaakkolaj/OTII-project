"use client"

import { useEffect, useRef } from "react"

const testimonials = [
  {
    quote: "We reduced screening time from 12 hours to 2.",
    author: "Sarah Chen",
    role: "Head of Talent, TechScale",
  },
  {
    quote: "The explainable rankings changed how our team hires. We trust the results.",
    author: "Marcus Rivera",
    role: "VP People, CloudBridge",
  },
  {
    quote: "Finally, a tool that actually saves time instead of adding complexity.",
    author: "Anya Patel",
    role: "Recruiting Lead, DataForge",
  },
]

const logos = ["Acme Corp", "TechScale", "CloudBridge", "DataForge", "StackOps", "PipelineCo"]

export function SocialProof() {
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
    <section ref={sectionRef} className="border-b border-border bg-card py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p
            data-animate
            className="animate-fade-in-up mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            Social Proof
          </p>
          <h2
            data-animate
            className="animate-fade-in-up animation-delay-100 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            Built for Modern Recruitment Teams
          </h2>
        </div>

        {/* Logo bar */}
        <div
          data-animate
          className="animate-fade-in-up animation-delay-200 mb-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {logos.map((logo) => (
            <div
              key={logo}
              className="flex h-10 items-center rounded-md bg-muted px-6"
            >
              <span className="text-sm font-medium text-muted-foreground">{logo}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              data-animate
              className={`animate-fade-in-up animation-delay-${(index + 3) * 100} rounded-2xl border border-border bg-background p-8`}
            >
              <blockquote className="mb-6 text-lg leading-relaxed text-foreground">
                {`"${testimonial.quote}"`}
              </blockquote>
              <div>
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
