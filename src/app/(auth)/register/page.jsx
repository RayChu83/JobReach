import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "next-view-transitions";

import React from "react";

export default function Register() {
  const handleAction = async (formData) => {
    "use server";
    const [name, email, password] = [
      formData.get("name"),
      formData.get("email"),
      formData.get("password"),
    ];
    console.log(name, email, password);
  };
  return (
    <main className="max-w-[1280px] m-auto p-4">
      <h1 className="sm:text-4xl text-3xl font-semibold">
        Register for an account
      </h1>
      <br />
      <form action={handleAction} className="flex flex-col">
        <Input placeholder="Name" name="name" className="mb-4" required />
        <Input
          placeholder="Email"
          name="email"
          type="email"
          className="mb-4"
          required
        />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          className="mb-2"
          required
        />
        <small className="mb-2 ml-1">
          Already have an account,{" "}
          <Link
            href="/login"
            className="text-[#1bbe17ff] hover:underline font-medium"
          >
            Login
          </Link>{" "}
        </small>
        <Button className="w-fit" variant="cta">
          Register
        </Button>
      </form>
    </main>
  );
}
