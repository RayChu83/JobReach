import { Users } from "@/models";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if ((!name, !email, !password)) {
      throw new Error("Invalid fields, Please try again!");
    }
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
      experience : []
    });
    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message ||  "An error occurred, please try again!" },
      { status: 500 }
    );
  }
}