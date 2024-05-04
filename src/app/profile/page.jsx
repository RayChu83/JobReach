import { getServerSession } from "next-auth";

import React from "react";

export default async function Profile() {
  const session = await getServerSession();
  return (
    <main className="max-w-[1280px] m-auto p-4">{JSON.stringify(session)}</main>
  );
}
