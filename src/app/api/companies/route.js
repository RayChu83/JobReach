import { Companies } from "@/models";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const companies = await Companies.find();
    return NextResponse.json(
      { message: "Success", companies },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "An error occurred, please try again!" }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    const body = await req.json();
    const company = await Companies.create({
      name: body.name,
      description: body.description,
      listings: [],
    });
    return NextResponse.json({ message: "Success", company }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred, please try again!" }, { status: 500 });
  }
}