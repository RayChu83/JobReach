import React from "react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

const getCompany = async (id) => {
  "use server";
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/companies/${id}`, {
    method: "get",
    cache : "no-store",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const resData = await res.json();
  if (!res.ok || !resData.company) {
    throw new Error("Failed to find company, please try again!");
  }
  return resData.company;
};

export default async function CompanyDetail({ params: { id } }) {
  const company = await getCompany(id);

  // const action = async (formdata) => {
  //   "use server";
  //   const [title, description] = [
  //     formdata.get("title"),
  //     formdata.get("description"),
  //   ];
  //   await fetch(`${process.env.NEXT_PUBLIC_URL}/api/jobs`, {
  //     method: "post",
  //     body: JSON.stringify({ title, description, company: company._id }),
  //   });
  // };
  return (
    <main className="max-w-[1280px] m-auto p-4 grid grid-cols-1 md:grid-cols-10 gap-4">
      {company && (
        <>
          <section className="col-span-6 flex flex-col gap-4">
            {company.listings.length ? (
              company.listings.map((listing) => (
                <article
                  className="p-4 rounded-sm outline outline-gray-300 outline-1 drop-shadow-sm"
                  key={listing._id}
                >
                  <Link
                    href={`/jobs/${listing._id}`}
                    className="text-xl font-medium hover:underline"
                  >
                    {listing.title}
                  </Link>
                  <br />
                  <Link
                    href={`/companies/${listing.company}`}
                    className="text-gray-500 text-sm"
                  >
                    {company.name}
                  </Link>
                  <p className=" mb-2">{listing.description}</p>
                  <div className="flex justify-end">
                    <Button variant="cta">Apply</Button>
                  </div>
                </article>
              ))
            ) : (
              <p></p>
            )}
          </section>
          <section className="col-span-4 sticky top-[108px] p-4 h-fit rounded-sm drop-shadow-sm">
            <h1 className="text-2xl font-medium">{company.name}</h1>
            <small className="text-gray-500">
              {company.listings.length} job
              {company.listings.length !== 1 && "s"} available
            </small>
            <p>{company.description}</p>
            {/* <h1 className="text-2xl font-medium">Create Job:</h1>
            <form action={action} className="flex flex-col gap-4">
              <Input name="title" placeholder="Job Title" required/>
              <Textarea name="description" placeholder="Description" required/>
              <Button variant="cta">Create</Button>
            </form> */}
          </section>
        </>
      )}
    </main>
  );
}
