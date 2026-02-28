"use client";

import { AccountSettings } from "./components/AccountSettings";
import { NotificationSettings } from "./components/NotificationSettings";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileOverview } from "./components/ProfileOverview";
import { RoleAccessCard } from "./components/RoleAccessCard";
import { SecuritySettings } from "./components/SecuritySettings";

export default function ProfilePage() {
  return (
      <main className="container mx-auto flex flex-col gap-8 p-8">
        <ProfileHeader />
        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <ProfileOverview />
          <RoleAccessCard />
        </section>
        <section className="grid gap-6 lg:grid-cols-2">
          <AccountSettings />
          <SecuritySettings />
        </section>
        <NotificationSettings />
      </main>
  );
}
