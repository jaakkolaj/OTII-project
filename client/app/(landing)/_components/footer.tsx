"use client"

import { useLanguage } from "@/lib/language-provider"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="font-display text-lg font-bold text-foreground">RankWise AI</span>
          <span className="text-sm text-muted-foreground">{t('footer.tagline')}</span>
        </div>

        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t('footer.product')}
          </a>
          <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t('footer.pricing')}
          </a>
          <a href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t('footer.contact')}
          </a>
          <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t('footer.privacy')}
          </a>
        </nav>

        <p className="text-sm text-muted-foreground">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  )
}
