"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function AccountSettings() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">Contact details</CardTitle>
        <CardDescription>
          Keep your recruiter contact info up to date for candidates and team
          members.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="profile-full-name">Full name</FieldLabel>
          <Input
            id="profile-full-name"
            autoComplete="name"
            defaultValue="Hanna Lehtinen"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="profile-title">Title</FieldLabel>
          <Input
            id="profile-title"
            autoComplete="organization-title"
            defaultValue="Talent Acquisition Manager"
          />
        </Field>
        <Field className="md:col-span-2">
          <FieldLabel htmlFor="profile-email">Work email</FieldLabel>
          <Input
            id="profile-email"
            type="email"
            autoComplete="email"
            defaultValue="hanna.lehtinen@northwind.ai"
          />
          <FieldDescription>
            Used for sign-in, candidate replies, and team notifications.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="profile-phone">Phone</FieldLabel>
          <Input
            id="profile-phone"
            type="tel"
            autoComplete="tel"
            defaultValue="+358 40 123 4567"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="profile-linkedin">LinkedIn</FieldLabel>
          <Input
            id="profile-linkedin"
            type="url"
            autoComplete="url"
            defaultValue="https://linkedin.com/in/hannalehtinen"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="profile-company">Company</FieldLabel>
          <Input id="profile-company" defaultValue="Northwind" />
        </Field>
        <Field>
          <FieldLabel htmlFor="profile-location">Office location</FieldLabel>
          <Input id="profile-location" defaultValue="Helsinki, FI" />
        </Field>
      </CardContent>
      <CardFooter className="justify-end gap-2 border-t">
        <Button variant="outline" size="sm">
          Reset
        </Button>
        <Button size="sm">Save changes</Button>
      </CardFooter>
    </Card>
  );
}
