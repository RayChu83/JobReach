import { Users } from "@/models";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const userExists = await Users.findOne({ $or: [{ name }, { email }] });
    if (userExists) {
      return NextResponse.json(
        { message: "Name or email is already in use." },
        { status: 500 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({
      name,
      email,
      password: hashedPassword,
      description: "",
      applications: [],
    });
    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred, please try again!" },
      { status: 500 }
    );
  }
}
