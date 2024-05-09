import { getUser } from "@/app/profile/_actions/getUser";
import { SignOutButton } from "@/app/profile/_components/SignOutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMailUnread } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { formatTimestamp } from "@/utils";
import JobsAppliedList from "@/app/profile/_components/JobsAppliedList";
import EditUserInfoForm from "./_components/EditUserInfoForm";
import EditUserDescriptionForm from "./_components/EditUserDescriptionForm";
import EditUserExperienceForm from "./_components/EditUserExperienceForm";

import React from "react";

export async function generateMetadata() {
  const user = await getUser();
  return {
    title: `${user.name} - JobReach`,
    description:
      user.description ||
      "JobReach is a online platform where you can discover 100+ different jobs, filter through jobs to your specific requirements, and apply to those positions",
  };
}

export default async function Profile() {
  const user = await getUser();
  // remove ._id we will be using id field
  const userExperienceWithoutId = user.experience.map(
    ({ jobTitle, jobCompany, jobDescription, id }) => ({
      jobTitle,
      jobCompany,
      jobDescription,
      id,
    })
  );
  return (
    <main className="max-w-[1280px] m-auto p-4">
      {user && (
        <>
          <span className="flex gap-2 items-center justify-between">
            <h1 className="font-extrabold text-3xl sm:text-4xl truncate">
              Welcome,{" "}
              <span className="text-[#1bbe17ff]" title={user.name}>
                {user.name}
              </span>
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-xl text-gray-500 outline-none">
                <BsThreeDotsVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Dialog>
                    <DialogTrigger className="text-sm py-[0.375rem] px-2 w-full flex hover:bg-[#f1f5f9] transition-colors">
                      Edit
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <EditUserInfoForm
                        name={user.name}
                        email={user.email}
                        id={String(user._id)}
                      />
                    </DialogContent>
                  </Dialog>
                </DropdownMenuItem>
                <SignOutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
          <p className="text-gray-500 flex items-center gap-1">
            <IoMailUnread />
            {user.email}
          </p>
          <div className="md:grid grid-cols-10 gap-4 flex flex-col mt-5">
            <section className="flex flex-col gap-4 md:col-span-6">
              <article>
                <span className="flex gap-2 items-center justify-between">
                  <h3 className="text-2xl font-semibold">About:</h3>
                  <Dialog>
                    <DialogTrigger>
                      <MdEdit className="text-xl cursor-pointer text-gray-500" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit description</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile description here. Click
                          save when you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <EditUserDescriptionForm
                        description={user.description}
                        id={String(user._id)}
                      />
                    </DialogContent>
                  </Dialog>
                </span>
                <p className="text-gray-500">
                  {user.description ||
                    "Tip: Adding a brief description helps employers gain insights on who you are as a person."}
                </p>
              </article>
              <hr />
              <article>
                <span className="flex gap-2 items-center justify-between mb-1">
                  <h3 className="text-2xl font-semibold">Work Experience:</h3>
                  <Dialog>
                    <DialogTrigger>
                      <MdEdit className="text-xl cursor-pointer text-gray-500" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit experience:</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile&apos;s experience here.
                          Click save when you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <EditUserExperienceForm
                        fetchedExperience={userExperienceWithoutId}
                        id={String(user._id)}
                      />
                    </DialogContent>
                  </Dialog>
                </span>
                {(userExperienceWithoutId.length && (
                  <section className="flex flex-col gap-2">
                    {userExperienceWithoutId.map((experience) => (
                      <article
                        className="p-4 rounded-sm drop-shadow-sm bg-[#F5F5F5]"
                        key={experience.id}
                      >
                        <h4 className="text-xl font-medium line-clamp-1 w-fit">
                          {experience.jobTitle}
                        </h4>
                        <small className="text-gray-500 text-sm">
                          {experience.jobCompany}
                        </small>
                        <p
                          className="whitespace-pre-wrap truncate"
                          title={experience.jobDescription}
                        >
                          {experience.jobDescription}
                        </p>
                      </article>
                    ))}
                  </section>
                )) || (
                  <p className="text-gray-500">
                    Tip: Adding work experience enhances your profile and
                    provides valuable insight to potential employers about your
                    professional background.
                  </p>
                )}
              </article>
              <hr />
            </section>
            <section className="md:col-span-4 mb-2">
              <JobsAppliedList jobs={user.applications.slice(0, 2)} />
            </section>
          </div>
        </>
      )}
      <article className="mt-2">
        <h3 className="text-2xl font-semibold">Additional Information:</h3>
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
    </main>
  );
}
