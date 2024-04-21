import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json()
        return NextResponse.json({message : "Message Sent"}, {status : 200})
    } catch (error) {
        return NextResponse.json({message : "An error occurred, please try again!"}, {status : 500})
    }
}