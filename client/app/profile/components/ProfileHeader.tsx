"use client";

export function ProfileHeader() {
  return (
    <header className="space-y-2">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">
        Profile
      </p>
      <h1 className="text-3xl font-bold">Your profile</h1>
      <p className="max-w-2xl text-muted-foreground">
        Manage your profile identity, team access, and communication preferences from
        one place.
      </p>
    </header>
  );
}
