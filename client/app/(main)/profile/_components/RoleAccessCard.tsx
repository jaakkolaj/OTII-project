"use client";

import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const permissionItems = [
  {
    id: "publish-roles",
    title: "Publish job postings",
    description: "Create, edit, and publish new roles instantly.",
    defaultChecked: true,
  },
  {
    id: "offer-approval",
    title: "Offer approval required",
    description: "Require director approval before sending offers.",
    defaultChecked: false,
  },
];

export function RoleAccessCard() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </span>
          Role & access
        </CardTitle>
        <CardDescription>
          Manage your team role, hiring focus, and permission defaults.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="profile-role">Role</FieldLabel>
            <Select defaultValue="recruiter">
              <SelectTrigger id="profile-role" className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Recruiting Admin</SelectItem>
                <SelectItem value="recruiter">Recruiter</SelectItem>
                <SelectItem value="manager">Hiring Manager</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="profile-team">Team</FieldLabel>
            <Select defaultValue="people-ops">
              <SelectTrigger id="profile-team" className="w-full">
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="people-ops">People Operations</SelectItem>
                <SelectItem value="tech">Tech Recruiting</SelectItem>
                <SelectItem value="business">Business Hiring</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="profile-region">Default hiring region</FieldLabel>
            <Input
              id="profile-region"
              defaultValue="Nordics (Helsinki, Stockholm, Oslo)"
            />
          </Field>
        </div>

        <div className="space-y-3">
          {permissionItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-muted/30 p-4"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <Switch id={item.id} defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2 border-t">
        <Button variant="outline" size="sm">
          Request elevated access
        </Button>
        <Button size="sm">Save role</Button>
      </CardFooter>
    </Card>
  );
}
