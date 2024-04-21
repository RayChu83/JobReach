import React from "react";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";

export default function PreviewJobs() {
  return (
    <div className="max-w-[1280px] m-auto p-4 ">
      <h1 className="text-3xl font-medium">Recently Added:</h1>
      <br />
      <section className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-4 ">
        <article className="bg-[#F5F5F5] p-4 rounded-sm drop-shadow-sm">
          <h1 className="text-xl font-medium">Front-End Developer</h1>
          <small className="text-gray-500">Google</small>
          <p className="line-clamp-2 overflow-hidden">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
            voluptate itaque dicta!
          </p>
        </article>
        <article className="bg-[#F5F5F5] p-4 rounded-sm drop-shadow-sm">
          <h1 className="text-xl font-medium">Back-End Developer</h1>
          <small className="text-gray-500">Microsoft</small>
          <p className="line-clamp-2 overflow-hidden">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            ea officia libero velit vitae.
          </p>
        </article>
        <article className="bg-[#F5F5F5] p-4 rounded-sm drop-shadow-sm">
          <h1 className="text-xl font-medium">Full Stack Developer</h1>
          <small className="text-gray-500">Google</small>
          <p className="line-clamp-2 overflow-hidden">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
            dolor beatae itaque asperiores eum! Temporibus earum dolore totam
            maxime nulla, nostrum ipsa!
          </p>
        </article>
        <article className="bg-[#F5F5F5] p-4 rounded-sm drop-shadow-sm">
          <h1 className="text-xl font-medium">UI UX Designer</h1>
          <small className="text-gray-500">Amazon</small>
          <p className="line-clamp-2 overflow-hidden">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni odio
            dignissimos alias blanditiis animi?
          </p>
        </article>
      </section>
      <div className="flex justify-center">
        <Button className="m-auto" variant="cta" asChild>
          <Link href="/jobs">See All Jobs</Link>
        </Button>
      </div>
    </div>
  );
}
