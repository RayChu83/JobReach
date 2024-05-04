import { getUser } from "./_actions/getUser";

import React from "react";
import { SignOutButton } from "./_components/SignOutButton";

export default async function Profile() {
  const user = await getUser();
  return (
    <main className="max-w-[1280px] m-auto p-4">
      <SignOutButton />
      <br />
      {JSON.stringify(user)}
    </main>
  );
}
