"use client";

import { Bell } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const notificationSettings = [
  {
    id: "new-applicants",
    title: "New applicant alerts",
    description: "Get notified when candidates apply to your roles.",
    defaultChecked: true,
  },
  {
    id: "interview-reminders",
    title: "Interview reminders",
    description: "Receive a reminder 1 hour before interviews start.",
    defaultChecked: true,
  },
  {
    id: "team-updates",
    title: "Team activity updates",
    description: "Updates about notes, handoffs, and feedback requests.",
    defaultChecked: false,
  },
  {
    id: "weekly-digest",
    title: "Weekly hiring digest",
    description: "A summary of pipeline health every Monday morning.",
    defaultChecked: true,
  },
];

export function NotificationSettings() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <Bell className="h-4 w-4 text-muted-foreground" />
          </span>
          Notifications
        </CardTitle>
        <CardDescription>
          Choose how you want to stay informed about candidate activity.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {notificationSettings.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-muted/30 p-4"
          >
            <div className="space-y-1">
              <Label htmlFor={item.id}>{item.title}</Label>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            <Switch id={item.id} defaultChecked={item.defaultChecked} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
