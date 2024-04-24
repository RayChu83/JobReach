import { Companies, Jobs } from "@/models";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    const job = await Jobs.findById(id).populate({
      path: "company",
      model : Companies,
      populate : {
        path : "listings",
        model : Jobs
      }
    });
    return NextResponse.json({ message: "Success", job }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred, please try again!" },
      { status: 500 }
    );
  }
}
