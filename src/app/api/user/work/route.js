import { Users } from "@/models";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { experience, id } = await req.json();
    if (!experience || !id) {
      throw new Error("Invalid fields, Please try again!");
    }
    const user = await Users.findByIdAndUpdate(id, {
      experience,
    });
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
