"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import React from "react";

export function SignOutButton() {
  return (
    <DropdownMenuItem onClick={signOut} className="text-red-500 font-medium cursor-pointer">
      Sign Out
    </DropdownMenuItem>
  );
}
