"use client";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormMessage from "@/components/FormMessage";
import { useRouter } from "next/navigation";

import React, { useState, useTransition } from "react";

export default function EditUserInfoForm({ name, email, id }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formMessage, setFormMessage] = useState(null);
  const handleAction = (formData) => {
    startTransition(async () => {
      setFormMessage(null);
      const name = formData.get("name")
      const res = await fetch("api/user", {
        method: "put",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, id }),
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
      <article className="flex flex-col gap-1 py-1">
        <Label htmlFor="name" className="w-fit ml-1">
          Name:
        </Label>
        <Input
          id="name"
          name="name"
          defaultValue={name}
          required
          maxLength="25"
        />
      </article>
      <article className="flex flex-col gap-1 py-1">
        <Label htmlFor="username" className="w-fit ml-1">
          Email:
        </Label>
        <Input
          id="username"
          name="email"
          value={email}
          type="text"
          readOnly
          className="text-gray-500 cursor-not-allowed"
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
