import React from "react";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Job } from "@/components/Job";

const getJobs = async () => {
  "use server";
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/jobs`, {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const { jobs } = await res.json();
  if (!res.ok || !jobs) {
    throw new Error("Failed to fetch jobs, please try again!");
  }
  return jobs.reverse().slice(0, 4);
};

export default async function PreviewJobs() {
  const jobs = await getJobs();
  return (
    <div className="max-w-[1280px] m-auto p-4 ">
      <h1 className="text-3xl font-medium">Recent Listings:</h1>
      <br />
      <section className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-4 ">
        {jobs && jobs.map((job) => <Job job={job} key={job._id} />)}
      </section>
      <div className="flex justify-center">
        <Button className="m-auto" variant="cta" asChild>
          <Link href="/jobs">See All Jobs</Link>
        </Button>
      </div>
    </div>
  );
}
