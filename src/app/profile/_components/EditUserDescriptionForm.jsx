"use client";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormMessage from "@/components/FormMessage";
import { useRouter } from "next/navigation";

import React, { useState, useTransition } from "react";

export default function EditUserDescriptionForm({ description, id }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formMessage, setFormMessage] = useState(null);
  const handleAction = (formData) => {
    startTransition(async () => {
      setFormMessage(null);
      const description = formData.get("description")
      const res = await fetch("api/user/description", {
        method: "put",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description, id }),
      });
      const { message } = await res.json();
      if (!res.ok) {
        setFormMessage({
          status: 500,
          message: message,
        });
        return;
      }
      if (res.ok) {
        setFormMessage({
          status: 200,
          message: message,
        });
        router.refresh();
      }
    });
  };
  return (
    <form className="flex flex-col gap-2" action={handleAction}>
      {formMessage && (
        <FormMessage
          status={formMessage.status}
          message={formMessage.message}
        />
      )}
      <article className="flex flex-col gap-1 py-2">
        <Label htmlFor="description" className="w-fit ml-1">
          Description:
        </Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={description}
          rows="5"
          maxLength="750"
        />
      </article>
      <DialogFooter>
        <Button type="submit" disabled={isPending} variant="cta">
          {isPending ? "Saving Changes..." : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}
