"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

export function Apply({ id }) {
  const router = useRouter();
  const [applied, setApplied] = useState(false);
  const apply = async () => {
    const res = await fetch(`/api/jobs/apply/${id}`, {
      method: "put",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      setApplied(true);
      router.refresh();
    }
  };
  return (
    <Button variant="cta" onClick={apply} disabled={applied}>
      {applied ? "Applied" : "Apply"}
    </Button>
  );
}
