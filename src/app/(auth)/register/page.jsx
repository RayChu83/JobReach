"use client";
import FormMessage from "@/components/FormMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "next-view-transitions";
import { useRouter } from "next/navigation";

import React, { useState, useTransition } from "react";

export default function Register() {
  const router = useRouter();
  const [formMessage, setFormMessage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const handleAction = (formData) => {
    const [name, email, password] = [
      formData.get("name"),
      formData.get("email").toLowerCase(),
      formData.get("password"),
    ];
    if (!name || !email || !password) {
      setFormMessage({ status: 500, message: "All fields required." });
      return;
    }
    startTransition(async () => {
      const res = await fetch("api/register", {
        method: "post",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormMessage({
          status: 500,
          message: data.message,
        });
        return;
      }
      if (res.ok) {
        setFormMessage({
          status: 200,
          message: data.message,
        });
        router.replace("/login");
        router.refresh();
      }
    });
  };
  return (
    <main className="max-w-[1280px] m-auto p-4">
      <h1 className="sm:text-4xl text-3xl font-semibold">
        Register for an account:
      </h1>
      <br />
      <form action={handleAction} className="flex flex-col gap-2">
        {formMessage && (
          <span>
            <FormMessage
              status={formMessage.status}
              message={formMessage.message}
            />
          </span>
        )}
        <article>
          <Label htmlFor="name" className="ml-1 cursor-pointer">
            Name:
          </Label>
          <Input placeholder="Your Name" id="name" name="name" required />
        </article>
        <article>
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
        <article>
          <Label htmlFor="password" className="ml-1 cursor-pointer">
            Password:
          </Label>
          <Input
            placeholder="Your Password"
            id="password"
            name="password"
            type={passwordVisible ? "text" : "password"}
            required
            minLength="8"
          />
        </article>
        <small
          className="ml-1 cursor-pointer text-gray-500"
          onClick={() => {
            setPasswordVisible((prev) => !prev);
          }}
        >
          {passwordVisible ? "Hide Password" : "Show Password"}
        </small>
        <Button variant="cta" disabled={isPending}>
          {isPending ? "Registering..." : "Register"}
        </Button>
        <small className="ml-1">
          Already have an account,{" "}
          <Link
            href="/login"
            className="text-[#1bbe17ff] hover:underline font-medium"
          >
            Login
          </Link>{" "}
        </small>
      </form>
    </main>
  );
}
