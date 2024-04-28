import { Link } from "next-view-transitions";
import { Job } from "@/components/Job";
import { getTotalApplicantsMessage } from "@/utils";
import { Apply } from "@/components/Apply";
import { FaLocationDot } from "react-icons/fa6";

import React from "react";

export async function generateMetadata({params : {id}}) {
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
    title : `${resData.job?.title || "Unknown"} - JobReach`
  }
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

export default async function JobDetailed({ params: { id } }) {
  const job = await getJob(id);
  return (
    <main className="max-w-[1280px] m-auto p-4 grid grid-cols-1 md:grid-cols-10 gap-4">
      {job && (
        <>
          <article className="col-span-6 p-4">
            <div className="flex items-center justify-between flex-wrap rounded-sm drop-shadow-sm gap-x-4 gap-y-2 mb-1">
              <article>
                <h1 className="text-2xl font-medium">{job.title}</h1>
                <small className="text-gray-500">
                  <Link
                    href={`/companies/${job.company._id}`}
                    className="font-semibold"
                  >
                    {job.company.name}
                  </Link>{" "}
                  - {getTotalApplicantsMessage(job.applied)}
                </small>
              </article>
              <Apply id={job._id} />
            </div>
            <p className="mb-4">{job.description}</p>
            <h2 className=" text-xl font-medium mb-4">Find similar roles:</h2>
            <section className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              {job.company.listings.length &&
                job.company.listings
                  .filter((listing) => listing._id !== id)
                  .slice(0, 2)
                  .map((listing) => <Job job={listing} key={listing._id} />)}
            </section>
          </article>
          <article className="col-span-4 p-4 sticky top-[108px] h-fit order-1 md:block hidden bg-[#F5F5F5] rounded-sm drop-shadow-sm">
            <Link
              href={`/companies/${job.company._id}`}
              className="text-2xl hover:text-[#1bbe17ff]"
            >
              {job.company.name}
            </Link>
            <br />
            <small className="text-gray-500 flex items-center gap-1">
              <FaLocationDot />
              {job.company.location}
            </small>
            <p>{job.company.description}</p>
          </article>
        </>
      )}
    </main>
  );
}
