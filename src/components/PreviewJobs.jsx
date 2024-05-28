import PreviewJobsList from "@/components/PreviewJobsList";

import React from "react";

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
  return resData.jobs.reverse().slice(0, 4);
};

export default async function PreviewJobs() {
  const jobs = await getJobs();
  return (
    jobs && <PreviewJobsList jobs={jobs}/>
  );
}
