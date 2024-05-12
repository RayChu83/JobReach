"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React from "react";

export function Apply({ id, appliedUsers, sessionId }) {
  const session = useSession();
  const router = useRouter();
  const apply = async () => {
    const res = await fetch(`/api/jobs/apply/${id}`, {
      method: "put",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessionId),
    });
    if (res.ok) {
      router.refresh();
    }
  };
  return (
    <Button
      variant="cta"
      onClick={apply}
      disabled={appliedUsers.includes(sessionId)}
    >
      {appliedUsers.includes(sessionId) ? "Applied" : "Apply"}
    </Button>
  );
}
