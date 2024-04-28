import Image from "next/image";

import React from "react";

export default function SocialProof() {
  return (
    <section className="max-w-[1280px] m-auto p-4">
      <h1 className="text-3xl font-medium">What our users have to say:</h1>
      <br />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1p-4 gap-4">
        <article className="p-4 rounded-sm drop-shadow-sm flex flex-col gap-2">
          <Image
            src="/socialproof/headshot1.png"
            alt="headshot-1"
            width={100}
            height={100}
            className="rounded-full m-auto bg-[#F5F5F5]"
          />
          <h3 className="text-xl font-medium text-center">Johnothan Dale</h3>
          <small className="text-gray-500 text-center">
            Senior Front End Developer
          </small>
          <p className="text-center text-gray-500 line-clamp-3">
            JobReach is an awesome source to find job opportunities that
            aren&apos;t as competitive as sites like LinkedIn or Indeed.
          </p>
        </article>
        <article className="p-4 rounded-sm drop-shadow-sm flex flex-col gap-2">
          <Image
            src="/socialproof/headshot2.png"
            alt="headshot-2"
            width={100}
            height={100}
            className="rounded-full m-auto bg-[#F5F5F5]"
          />
          <h3 className="text-xl font-medium text-center">Henry Zhang</h3>
          <small className="text-gray-500 text-center">UI UX Designer</small>
          <p className="text-center text-gray-500 line-clamp-3">
            JobReach helped me land my first position at Netflix as a UI UX
            Designer. Thanks to them, this is my go to site for applying to
            positions.
          </p>
        </article>
        <article className="p-4 rounded-sm drop-shadow-sm flex flex-col gap-2">
          <Image
            src="/socialproof/headshot3.png"
            alt="headshot-3"
            width={100}
            height={100}
            className="rounded-full m-auto bg-[#F5F5F5]"
          />
          <h3 className="text-xl font-medium text-center">Adrian Camels</h3>
          <small className="text-gray-500 text-center">
            Full Stack Developer
          </small>
          <p className="text-center text-gray-500 line-clamp-3">
            Thanks to JobReach and their small community, I was able to hear
            back from 90% of the positions I applied to and landed my first job.
          </p>
        </article>
      </div>
    </section>
  );
}
