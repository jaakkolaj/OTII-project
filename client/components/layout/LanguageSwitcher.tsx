"use client";

import { useLanguage } from "@/lib/language-provider";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="rounded-full"
      >
        English
      </Button>
      <Button
        variant={language === "fi" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("fi")}
        className="rounded-full"
      >
        Suomi
      </Button>
    </div>
  );
}
