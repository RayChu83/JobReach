import { Jobs, Users } from "@/models";
import { NextResponse } from "next/server";

export async function PUT(req, { params: { id } }) {
  try {
    const userId = await req.json();
    if (!userId) throw new Error("Session not available, Please try again!");
    await Users.findByIdAndUpdate(userId, {
      $push: { applications: `${id}` },
    });
    await Jobs.findByIdAndUpdate(id, { $push: { applied: userId } });
    return NextResponse.json({ message: "Success!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "An error occurred, please try again!" },
      { status: 500 }
    );
  }
}
