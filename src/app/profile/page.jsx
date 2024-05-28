import { getUser } from "@/app/profile/_actions/getUser";
import Profile from "@/app/profile/_components/Profile";
import { notFound } from "next/navigation";

import React from "react";

export async function generateMetadata() {
  const user = await getUser();
  return {
    title: `${user.name} - JobReach`,
    description:
      user.description ||
      "JobReach is a online platform where you can discover 100+ different jobs, filter through jobs to your specific requirements, and apply to those positions",
  };
}

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) {
    notFound();
  }
  return user && <Profile user={JSON.stringify(user)} />;
}
