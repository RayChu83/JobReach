import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { Job } from "@/components/Job";

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

const totalApplicantsMessage = (applicants) => {
  let text;
  switch (applicants) {
    case 0:
      text = "Be the first to apply to this role!";
      break;
    case applicants < 10:
      text = "A few people have applied to this role.";
      break;
    default:
      text = "Many people have applied to this role.";
      break;
  }
  return text;
};

export default async function JobDetailed({ params: { id } }) {
  const job = await getJob(id);
  return (
    <main className="max-w-[1280px] m-auto p-4 grid grid-cols-1 md:grid-cols-10 gap-4">
      {job && (
        <>
          <article className="col-span-6 p-4">
            <div className="flex items-center justify-between flex-wrap rounded-sm drop-shadow-sm gap-x-4 gap-y-2 mb-4">
              <article>
                <h1 className="text-2xl font-medium">{job.title}</h1>
                <small className="text-gray-500"><Link href={`/companies/${job.company._id}`} className="font-semibold">{job.company.name}</Link> - {totalApplicantsMessage(job.applied)}</small>
              </article>
              <Button variant="cta">Apply</Button>
            </div>
            <p className="mb-4">{job.description}</p>
            <h2 className=" text-xl font-medium mb-4">Find more roles:</h2>
            <section className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              {job.company.listings.length && job.company.listings.slice(0,2).map(listing => (
                <Job job={listing} key={listing._id}/>
              ))}
            </section>
          </article>
          <article className="col-span-4 p-4 sticky top-[108px] h-fit order-1">
            <Link
              href={`/companies/${job.company._id}`}
              className="text-2xl hover:text-[#1bbe17ff]"
            >
              {job.company.name}
            </Link>
            <br />
            <small className="text-gray-500">
              {job.company.listings.length} job
              {job.company.listings.length !== 1 && "s"} available
            </small>
            <p>{job.company.description}</p>
          </article>
        </>
      )}
    </main>
  );
}
