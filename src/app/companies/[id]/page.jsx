import React from "react";

const getCompany = async (id) => {
  "use server";
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/companies/${id}`);
  const { company } = await res.json();
  if (!res.ok || !company) {
    throw new Error("Failed to find company, please try again!");
  }
  return company;
};

export default async function CompanyDetail({ params: { id } }) {
  const company = await getCompany(id);
  console.log(company);
  return <main></main>;
}
