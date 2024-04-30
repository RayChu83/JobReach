import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "next-view-transitions";

import React from "react";

export default function Login() {
  return (
    <main className="max-w-[1280px] m-auto p-4">
      <h1 className="sm:text-4xl text-3xl font-semibold">
        Login to an existing account
      </h1>
      <br />
      <form action="" className="flex flex-col">
        <Input
          placeholder="Email"
          type="email"
          name="email"
          className="mb-4"
          required
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          className="mb-2"
          required
        />
        <small className="mb-2 ml-1">
          Don&apos;t have an account,{" "}
          <Link
            href="/register"
            className="text-[#1bbe17ff] hover:underline font-medium"
          >
            Register
          </Link>
        </small>
        <Button className="w-fit" variant="cta">
          Log In
        </Button>
      </form>
    </main>
  );
}
