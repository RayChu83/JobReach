import { Companies, Jobs } from "@/models";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const jobs = await Jobs.find().populate({
      path: "company",
      model: Companies,
    });
    return NextResponse.json({ message: "Success", jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred, please try again!" },
      { status: 500 }
    );
  }
}