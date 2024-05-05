import { getUser } from "@/app/profile/_actions/getUser";
import { SignOutButton } from "@/app/profile/_components/SignOutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMailUnread } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { formatTimestamp } from "@/utils";
import JobsAppliedList from "@/app/profile/_components/JobsAppliedList";

import React from "react";

export default async function Profile() {
  const user = await getUser();
  return (
    <main className="max-w-[1280px] m-auto p-4 md:grid grid-cols-10 gap-4 flex flex-col">
      {user && (
        <>
          <section className="md:col-span-6 h-fit flex flex-col gap-2">
            <article className="bg-[#F5F5F5] rounded-sm drop-shadow-sm p-4">
              <span className="flex gap-2 items-center justify-between">
                <h1
                  className="text-3xl font-semibold truncate"
                  title={user.name}
                >
                  {user.name}
                </h1>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-lg">
                    <BsThreeDotsVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="cursor-pointer">
                      Edit
                    </DropdownMenuItem>
                    <SignOutButton />
                  </DropdownMenuContent>
                </DropdownMenu>
              </span>
              <p className="text-gray-500 flex items-center gap-1">
                <IoMailUnread />
                {user.email}
              </p>
            </article>
            <article className="bg-[#F5F5F5] rounded-sm drop-shadow-sm p-4">
              <h3 className="text-xl font-medium">Description:</h3>
              <p className="text-gray-500">
                {user.description ||
                  "Adding a brief description helps employers gain insights on who you are as a person."}
              </p>
            </article>
            <article className="bg-[#F5F5F5] rounded-sm drop-shadow-sm p-4">
              <h3 className="text-xl font-medium">Additional Information:</h3>
              <span className="flex flex-col">
                <small className="text-gray-500 flex items-center gap-1">
                  <MdOutlineDateRange />
                  Join Date: {formatTimestamp(user.createdAt)}
                </small>
                <small className="text-gray-500 flex items-center gap-1">
                  <MdOutlineDateRange />
                  Last Edited: {formatTimestamp(user.updatedAt)}
                </small>
              </span>
            </article>
          </section>
          <section className="md:col-span-4">
            <JobsAppliedList jobs={user.applications} />
          </section>
        </>
      )}
    </main>
  );
}
