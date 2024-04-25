"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export function Apply({id}) {
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
    }
  };
  return (
    <Button variant="cta" onClick={apply} disabled={applied}>
      {applied ? "Applied" : "Apply"}
    </Button>
  );
}
