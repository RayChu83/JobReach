import { Users } from "@/models";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { description, id } = await req.json();
    if (!id) {
      throw new Error("Session not available, Please try again!");
    }
    await Users.findByIdAndUpdate(id, { description });
    return NextResponse.json(
      { message: "Account updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message || "Something went wrong, Please try again!",
      },
      { status: 500 }
    );
  }
}
