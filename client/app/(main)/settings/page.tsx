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

export default function SettingsPage() {
  return (
      <main className="container mx-auto flex flex-col gap-8 p-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account details and app preferences.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader className="flex flex-col gap-2">
              <div className="flex w-full items-center justify-between">
                <CardTitle>Information</CardTitle>
                <CardAction>
                  <Button variant="outline">Save</Button>
                </CardAction>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="text-left">
                  <Label className="mb-2 block" htmlFor="Name">Name</Label>
                  <Input placeholder="Type something..." />
                </div>
                <div className="text-left">
                  <Label className="mb-2 block" htmlFor="Email">Email</Label>
                  <Input placeholder="Type something..." />
                </div>
              </div>

              <div className="text-left">
                <Label className="mb-2" htmlFor="Role">
                  Role
                </Label>
                <Select>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Role</SelectLabel>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <CardTitle>Preferences</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="text-left">
                <Label className="mb-2" htmlFor="Theme">
                  Theme
                </Label>
                <ModeToggle />
              </div>
              <div className="text-left">
                <Label className="mb-2" htmlFor="Language">
                  Language
                </Label>
                <Select>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Languages</SelectLabel>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="finnish">Finnish</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="japan">Japan UwU</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
  )
}