import { Companies, Jobs } from "@/models";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const jobs = await Jobs.find().populate({
      path: "company",
      model: Companies,
    });
    console.log(jobs)
    return NextResponse.json({ message: "Success", jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred, please try again!" },
      { status: 500 }
    );
  }
}

// export async function POST(req) {
//   try {
//     const { title, description, company } = await req.json();
//     const job = await Jobs.create({
//       title,
//       description,
//       applied: 0,
//       company,
//     });
//     const updatedCompany = await Companies.findByIdAndUpdate(company, {
//       $push: { listings: job._id },
//     });
//     return NextResponse.json(
//       { message: "Success", job, updatedCompany },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "An error occurred, please try again!" },
//       { status: 500 }
//     );
//   }
// }
