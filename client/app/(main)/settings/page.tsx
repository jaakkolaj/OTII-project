"use client"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"

import { ModeToggle } from "@/components/layout/ModeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useLanguage } from "@/lib/language-provider";

export default function SettingsPage() {
  const { t } = useLanguage();
  return (
      <main className="container mx-auto flex flex-col gap-8 p-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">{t('settings.title')}</h1>
          <p className="text-muted-foreground">{t('settings.description')}</p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader className="flex flex-col gap-2">
              <div className="flex w-full items-center justify-between">
                <CardTitle>{t('settings.information')}</CardTitle>
                <CardAction>
                  <Button variant="outline">{t('buttons.save')}</Button>
                </CardAction>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="text-left">
                  <Label className="mb-2 block" htmlFor="Name">{t('profile.name')}</Label>
                  <Input placeholder={t('settings.typeSomething')} />
                </div>
                <div className="text-left">
                  <Label className="mb-2 block" htmlFor="Email">{t('profile.email')}</Label>
                  <Input placeholder={t('settings.typeSomething')} />
                </div>
              </div>

              <div className="text-left">
                <Label className="mb-2" htmlFor="Role">
                  {t('settings.role')}
                </Label>
                <Select>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder={t('settings.selectRole')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t('settings.role')}</SelectLabel>
                      <SelectItem value="Admin">{t('settings.roles.admin')}</SelectItem>
                      <SelectItem value="User">{t('settings.roles.user')}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <CardTitle>{t('settings.preferences')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="text-left">
                <Label className="mb-2" htmlFor="Theme">
                  {t('settings.theme')}
                </Label>
                <ModeToggle />
              </div>
              <div className="text-left">
                <Label className="mb-2" htmlFor="Language">
                  {t('settings.language')}
                </Label>
                <div className="mt-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
  )
}