import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import SidebarLayout from "../SidebarLayout";

import { ModeToggle } from "@/components/layout/ModeToggle";

export default function SettingsPage() {
    return (
    <SidebarLayout>
      <div className="container mx-auto flex flex-col items-center gap-10 py-6">
      <div className="text-left text-3xl w-full max-w-xl">Settings</div>

      <Card className="w-full max-w-xl">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center justify-between w-full">
            <CardTitle>Information</CardTitle>
            <CardAction>
              <Button variant="outline">Save</Button>
            </CardAction>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-4">
          <div className="flex justify-start gap-4">
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

      <Card className="w-full max-w-xl">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center justify-between w-full">
            <CardTitle>Misc</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-4">
          <div className="flex items-center space-x-2">
            <Label className="mb-0" htmlFor="Theme">
              Theme
            </Label>
          </div>
          <ModeToggle/>
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
      </div>
    </SidebarLayout>
  )
}