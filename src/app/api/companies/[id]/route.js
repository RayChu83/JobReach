import { Companies, Jobs } from "@/models";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    const company = await Companies.findById(id).populate({
      path: "listings",
      model: Jobs,
    });
    return NextResponse.json({ message: "Success!", company }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred, please try again!" },
      { status: 500 }
    );
  }
}
