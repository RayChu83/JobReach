import React from "react";
import Image from "next/image";

export default function SocialProof() {
  return (
    <section className="max-w-[1280px] m-auto p-4">
      <h1 className="text-3xl font-medium">What our users have to say:</h1>
      <br />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1p-4 gap-4">
        <article className="p-4 rounded-sm drop-shadow-sm flex flex-col gap-2">
          <Image
            src="/headshot.png"
            alt="headshot-1"
            width={100}
            height={100}
            className="rounded-full m-auto bg-[#F5F5F5]"
          />
          <h3 className="text-xl font-medium text-center">John Doe</h3>
          <p className="text-center text-gray-500 line-clamp-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum,
            soluta facilis? Et unde a, earum nobis doloribus, fuga ipsam ullam
            aliquid, similique repellendus doloremque itaque fugiat magnam.
            Eligendi, reprehenderit enim.
          </p>
        </article>
        <article className="p-4 rounded-sm drop-shadow-sm flex flex-col gap-2">
          <Image
            src="/headshot.png"
            alt="headshot-1"
            width={100}
            height={100}
            className="rounded-full m-auto bg-[#F5F5F5]"
          />
          <h3 className="text-xl font-medium text-center">Joseph Dale</h3>
          <p className="text-center text-gray-500 line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, odio
            eaque? Ad doloribus voluptate nihil quas odio officia. Modi, odio?
            Minus, doloremque?
          </p>
        </article>
        <article className="p-4 rounded-sm drop-shadow-sm flex flex-col gap-2">
          <Image
            src="/headshot.png"
            alt="headshot-1"
            width={100}
            height={100}
            className="rounded-full m-auto bg-[#F5F5F5]"
          />
          <h3 className="text-xl font-medium text-center">Jake Donovan</h3>
          <p className="text-center text-gray-500 line-clamp-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque,
            quae porro aut laboriosam sit vitae iusto.
          </p>
        </article>
      </div>
    </section>
  );
}
