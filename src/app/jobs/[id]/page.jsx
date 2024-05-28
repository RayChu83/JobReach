import { notFound } from "next/navigation";
import { getUser } from "@/app/profile/_actions/getUser";
import JobDetailed from "./_components/JobDetailed";

import React from "react";

export async function generateMetadata({ params: { id } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/jobs/${id}`, {
    method: "get",
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const resData = await res.json();
  return {
    title: `${resData.job?.title || "Unknown"} - JobReach`,
  };
}

const getJob = async (id) => {
  "use server";
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/jobs/${id}`, {
    method: "get",
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const resData = await res.json();
  if (!res.ok || !resData.job) {
    throw new Error("Failed to find job, please try again!");
  }
  return resData.job;
};

export default async function JobDetailedPage({ params: { id } }) {
  const job = await getJob(id);
  const user = await getUser();
  if (!job || !user) {
    notFound();
  }
  return (
    job && <JobDetailed job={job} user={JSON.stringify(user)} jobId={id} />
  );
}
