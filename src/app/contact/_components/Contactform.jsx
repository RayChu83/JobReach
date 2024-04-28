"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormMessage from "@/app/contact/_components/FormMessage";

import React, { useState } from "react";

export default function Contactform() {
  const [formMessage, setFormMessage] = useState(null);
  const action = async (formdata) => {
    setFormMessage(null);
    const [name, email, message] = [
      formdata.get("name"),
      formdata.get("email"),
      formdata.get("message"),
    ];
    const res = await fetch(`/api/contact`, {
      method: "post",
      body: JSON.stringify({ name, email, message }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const [status, json] = await Promise.all([
      await res.status,
      await res.json(),
    ]);
    setFormMessage({ status, ...json });
  };
  return (
    <form action={action} className="flex flex-col gap-y-4 w-full">
      {formMessage && (
        <FormMessage
          status={formMessage.status}
          message={formMessage.message}
        />
      )}
      <Input placeholder="Your Name" name="name" required />
      <Input type="email" placeholder="Email" name="email" required />
      <Textarea placeholder="Message" rows="3" name="message" required />
      <Button type="submit" variant="cta">
        Send
      </Button>
    </form>
  );
}
