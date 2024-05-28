"use client";
import { Link } from "next-view-transitions";
import { Job } from "@/components/Job";
import { getTotalApplicantsMessage } from "@/utils";
import { Apply } from "@/components/Apply";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import { opacityUpwardsAnimation, slowStaggerVariant } from "@/animations";

import React from "react";

export default function JobDetailed({ job, user, jobId }) {
  user = JSON.parse(user);
  return (
    <motion.main
      className="max-w-[1280px] m-auto p-4 grid grid-cols-1 md:grid-cols-10 gap-4"
      {...opacityUpwardsAnimation}
    >
      <article className="col-span-6">
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
              - {getTotalApplicantsMessage(job.applied.length)}
            </small>
          </article>
          <Apply
            id={job._id}
            appliedUsers={job.applied}
            userId={String(user._id)}
          />
        </div>
        <p className="mb-4 truncate whitespace-pre-wrap">{job.description}</p>
        <h2 className=" text-xl font-medium mb-4">Find similar roles:</h2>
        {job.company.listings.length && (
          <section className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            {job.company.listings
              .filter((listing) => listing._id !== jobId)
              .slice(0, 2)
              .map((listing, index) => (
                <motion.span
                  key={job._id}
                  custom={index}
                  {...slowStaggerVariant}
                >
                  <Job job={listing} isDescriptionFaded={true} />
                </motion.span>
              ))}
          </section>
        )}
      </article>
      <article className="col-span-4 p-4 sticky top-[96px] h-fit order-1 md:block hidden bg-[#F5F5F5] rounded-sm drop-shadow-sm">
        <Link
          href={`/companies/${job.company._id}`}
          className="text-2xl hover:text-[#1bbe17ff] font-semibold"
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
    </motion.main>
  );
}
