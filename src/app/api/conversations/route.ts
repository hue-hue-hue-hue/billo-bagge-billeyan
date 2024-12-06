import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const conversation = await prisma.conversations.create({
      data: json,
    });

    return NextResponse.json({
      status: "success",
      data: conversation,
    });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(request: Request) {
  try {
    const conversations = await prisma.conversations.findMany();

    return NextResponse.json({ status: "success", data: conversations });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
