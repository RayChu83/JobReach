import { Companies, Jobs } from "@/models";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const companies = await Companies.find().populate({
      path: "listings",
      model: Jobs,
    });
    return NextResponse.json(
      { message: "Success!", companies },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred, please try again!" },
      { status: 500 }
    );
  }
}
