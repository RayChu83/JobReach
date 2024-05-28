"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import React from "react";

export function Apply({ id, appliedUsers, userId }) {
  const router = useRouter();
  const apply = async () => {
    const res = await fetch(`/api/jobs/apply/${id}`, {
      method: "put",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userId),
    });
    if (res.ok) {
      router.refresh();
    }
  };
  return (
    <Button
      variant="cta"
      onClick={apply}
      disabled={appliedUsers.includes(userId)}
    >
      {appliedUsers.includes(userId) ? "Applied" : "Apply"}
    </Button>
  );
}
