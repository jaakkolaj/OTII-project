"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {Menu, X } from "lucide-react"
import Link from "next/link"
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="font-display text-xl font-bold tracking-tight text-foreground">
          RankWise AI
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#problem" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Problem
          </a>
          <a href="#solution" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Solution
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How It Works
          </a>
          <a href="#comparison" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Why RankWise
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/book-demo">
            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-foreground">
              Book a Demo
            </Button>
          </Link>
          <Link href="/login">
          <Button  size="sm" className="rounded-full bg-foreground px-5 text-sm text-background hover:bg-foreground/90">
            Login
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
              Problem
            </a>
            <a href="#solution" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
              Solution
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
              How It Works
            </a>
            <a href="#comparison" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
              Why RankWise
            </a>
            <div className="flex flex-col gap-3 pt-4">
              <Link href="/book-demo">
              <Button variant="outline" size="sm" className="w-full">
                Book a Demo
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="w-full bg-foreground text-background hover:bg-foreground/90">
                login
              </Button>
            </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
