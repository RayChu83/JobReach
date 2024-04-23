import React from "react";
import { JobsList } from "@/app/jobs/_components/JobsList";

const getJobs = async () => {
  "use server";
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/jobs`, {
    method: "get",
    cache: "no-cache",
  });
  const { jobs } = await res.json();
  if (!res.ok || !jobs) {
    console.log("Failed to fetch jobs, please try again!");
  }
  return jobs;
};

export default async function Jobs() {
  const jobs = await getJobs();
  return jobs && <JobsList jobs={jobs} />;
}
