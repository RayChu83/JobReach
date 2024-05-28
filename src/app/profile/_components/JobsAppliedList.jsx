import { Job } from "@/components/Job";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import NoApplications from "@/app/profile/_components/NoApplications";

import React from "react";

export default function JobsAppliedList({ jobs }) {
  return (
    <>
      <h3 className="text-2xl font-semibold mb-2">Recent Applications:</h3>
      {jobs && (
        <section className="flex flex-col gap-2 mb-2">
          {jobs.map((job) => (
            <Job job={job} key={job._id} />
          ))}
        </section>
      )}
      {jobs.length ? (
        <div>
          <Button variant="cta" asChild className="w-full">
            <Link href="/jobs">Apply to more roles</Link>
          </Button>
        </div>
      ) : (
        <NoApplications />
      )}
    </>
  );
}
