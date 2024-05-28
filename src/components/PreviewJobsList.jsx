"use client";
import { motion } from "framer-motion";
import { Job } from "@/components/Job";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { opacityAnimation, slowStaggerVariant } from "@/animations";

import React from "react";

export default function PreviewJobsList({ jobs }) {
  return (
    <motion.div className="max-w-[1280px] m-auto p-4" {...opacityAnimation}>
      <h1 className="text-3xl font-medium">Recent Listings:</h1>
      <br />
      <section className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-4">
        {jobs &&
          jobs.map((job, index) => (
            <motion.span key={job._id} custom={index} {...slowStaggerVariant}>
              <Job
                job={job}
                isDescriptionFaded={true}
                displayDetailsOnHover={true}
              />
            </motion.span>
          ))}
      </section>
      <div className="flex justify-center">
        <Button className="m-auto" variant="cta" asChild>
          <Link href="/jobs">See All Jobs</Link>
        </Button>
      </div>
    </motion.div>
  );
}
