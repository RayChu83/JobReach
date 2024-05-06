"use client";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FormMessage from "@/components/FormMessage";
import { useRouter } from "next/navigation";

import React, { useState, useTransition } from "react";

export default function EditUserForm({ name, email, description, id }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formMessage, setFormMessage] = useState(null);
  const handleAction = (formData) => {
    startTransition(async () => {
      setFormMessage(null);
      const [name, description] = [
        formData.get("name"),
        formData.get("description"),
      ];
      const res = await fetch("api/user", {
        method: "put",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, id }),
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
    <form className="grid gap-4" action={handleAction}>
      {formMessage && (
        <FormMessage
          status={formMessage.status}
          message={formMessage.message}
        />
      )}
      <div className="grid grid-cols-4 items-center gap-4 py-2">
        <Label htmlFor="name" className="text-right">
          Name:
        </Label>
        <Input
          id="name"
          name="name"
          defaultValue={name}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Email:
        </Label>
        <Input
          id="username"
          name="email"
          value={email}
          type="text"
          readOnly
          className="col-span-3 text-gray-500 cursor-not-allowed"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description:
        </Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={description}
          className="col-span-3"
          rows="5"
        />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving Changes..." : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}
