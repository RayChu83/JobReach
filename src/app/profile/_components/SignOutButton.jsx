"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import React from "react";

export function SignOutButton() {
  return <Button onClick={signOut} variant="destructive">Sign Out</Button>;
}
