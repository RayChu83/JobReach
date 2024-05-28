import { JobsList } from "@/app/jobs/_components/JobsList";

import React from "react";

export const metadata = {
  title: "See Jobs - JobReach",
};

const getJobs = async () => {
  "use server";
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/jobs`, {
    method: "get",
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const resData = await res.json();
  if (!res.ok || !resData?.jobs) {
    throw new Error("Failed to fetch jobs, please try again!");
  }
  return resData.jobs;
};

export default async function Jobs() {
  const jobs = await getJobs();
  return jobs && <JobsList jobs={jobs} />;
}
