"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {Menu, X } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher"
import { useLanguage } from "@/lib/language-provider"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="font-display text-xl font-bold tracking-tight text-foreground">
          RankWise AI
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#problem" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t('nav.problem')}
          </a>
          <a href="#solution" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t('nav.solution')}
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t('nav.howItWorks')}
          </a>
          <a href="#comparison" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t('nav.why')}
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-foreground">
            {t('nav.bookDemo')}
          </Button>
          <Link href="/login">
          <Button  size="sm" className="rounded-full bg-foreground px-5 text-sm text-background hover:bg-foreground/90">
            {t('nav.login')}
          </Button>
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#problem" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
              {t('nav.problem')}
            </a>
            <a href="#solution" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
              {t('nav.solution')}
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
              {t('nav.howItWorks')}
            </a>
            <a href="#comparison" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
              {t('nav.why')}
            </a>
            <div className="border-t border-border pt-4">
              <LanguageSwitcher />
            </div>
            <div className="flex flex-col gap-3">
              <Button variant="outline" size="sm" className="w-full">
                {t('nav.bookDemo')}
              </Button>
              <Button size="sm" className="w-full bg-foreground text-background hover:bg-foreground/90">
                {t('nav.login')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
