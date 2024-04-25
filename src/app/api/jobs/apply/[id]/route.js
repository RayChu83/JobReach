import { Jobs } from "@/models";
import { NextResponse } from "next/server";

export async function PUT(req, { params: { id } }) {
  try {
    await Jobs.findByIdAndUpdate(id, { $inc: { applied: 1 } });
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred, please try again!" },
      { status: 500 }
    );
  }
}
