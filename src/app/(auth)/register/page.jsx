"use client";
import FormMessage from "@/components/FormMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "next-view-transitions";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [formMessage, setFormMessage] = useState(null);
  const handleAction = async (formData) => {
    const [name, email, password] = [
      formData.get("name"),
      formData.get("email"),
      formData.get("password"),
    ];
    if (!name || !email || !password) {
      setFormMessage({ status: 500, message: "All fields required." });
      return;
    }
    setPending(true);
    const res = await fetch("api/register", {
      method: "post",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    setPending(false);
    const data = await res.json();
    if (!res.ok) {
      setFormMessage({
        status: 500,
        message: data.message,
      });
    }
    if (res.ok) {
      setFormMessage({
        status: 200,
        message: data.message,
      });
      router.push("/login");
    }
  };
  return (
    <main className="max-w-[1280px] m-auto p-4">
      <h1 className="sm:text-4xl text-3xl font-semibold">
        Register for an account:
      </h1>
      <br />
      <form action={handleAction} className="flex flex-col">
        {formMessage && (
          <span className="mb-4">
            <FormMessage
              status={formMessage.status}
              message={formMessage.message}
            />
          </span>
        )}
        <article className="mb-4">
          <Label htmlFor="name" className="ml-1 cursor-pointer">
            Name:
          </Label>
          <Input placeholder="Your Name" id="name" name="name" required />
        </article>
        <article className="mb-4">
          <Label htmlFor="email" className="ml-1 cursor-pointer">
            Email:
          </Label>
          <Input
            placeholder="Your Email"
            id="email"
            name="email"
            type="email"
            required
          />
        </article>
        <article className="mb-2">
          <Label htmlFor="password" className="ml-1 cursor-pointer">
            Password:
          </Label>
          <Input
            placeholder="Your Password"
            id="password"
            name="password"
            type="password"
            required
            minLength="8"
          />
        </article>
        <small className="mb-2 ml-1">
          Already have an account,{" "}
          <Link
            href="/login"
            className="text-[#1bbe17ff] hover:underline font-medium"
          >
            Login
          </Link>{" "}
        </small>
        <Button className="w-fit" variant="cta" disabled={pending}>
          {pending ? "Registering..." : "Register"}
        </Button>
      </form>
    </main>
  );
}
