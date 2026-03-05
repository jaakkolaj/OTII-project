

import { AccountSettings } from "./_components/AccountSettings";
import { NotificationSettings } from "./_components/NotificationSettings";
import { ProfileHeader } from "./_components/ProfileHeader";
import { ProfileOverview } from "./_components/ProfileOverview";
import { RoleAccessCard } from "./_components/RoleAccessCard";
import { SecuritySettings } from "./_components/SecuritySettings";

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
