import { Job } from "@/components/Job";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

import React from "react";

export default function JobsAppliedList({ jobs }) {
  return (
    <>
      <h3 className="text-2xl font-medium mb-2 px-2">Applications:</h3>
      {jobs && (
        <section className="flex flex-col gap-2 max-h-[289px] overflow-auto p-2">
          {jobs.map((job) => (
            <Job job={job} key={job._id} />
          ))}
        </section>
      )}
      {jobs.length ? (
        <div className="px-2 mt-2">
          <Button variant="cta" asChild className="w-full">
            <Link href="/jobs">Apply to more roles</Link>
          </Button>
        </div>
      ) : (
        <p className="text-center px-2 text-gray-500">Recent applications will be displayed here.</p>
      )}
    </>
  );
}
