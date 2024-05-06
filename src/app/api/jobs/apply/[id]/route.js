import { Jobs, Users } from "@/models";
import { NextResponse } from "next/server";

export async function PUT(req, { params: { id } }) {
  try {
    const sessionId = await req.json();
    if (!sessionId) throw new Error("Session not available, Please try again!");
    await Users.findByIdAndUpdate(sessionId, {
      $push: { applications: `${id}` },
    });
    await Jobs.findByIdAndUpdate(id, { $push: { applied: sessionId } });
    return NextResponse.json({ message: "Success!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "An error occurred, please try again!" },
      { status: 500 }
    );
  }
}
