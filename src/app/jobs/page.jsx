import React from "react";
import { JobsList } from "@/app/jobs/_components/JobsList";

const getJobs = async () => {
  "use server";
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/jobs`, {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const resData = await res.json();
  if (!res.ok || !resData?.jobs) {
    throw new Error("Failed to fetch jobs, please try again!");
  }
  return jobs;
};

export default async function Jobs() {
  const jobs = await getJobs();
  return jobs && <JobsList jobs={jobs} />;
}
