import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const conversation = await prisma.chat.findUnique({
      where: { id: params.chatId },
      include: { messages: true },
    });

    if (!conversation) {
      return new NextResponse(
        JSON.stringify({ status: "error", message: "No conversation found" }),
        { status: 404 }
      );
    }

    return NextResponse.json({ status: "success", data: conversation });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const json = await request.json();
    const message = await prisma.message.create({
      data: { ...json, chatId: params.chatId },
    });

    return NextResponse.json({
      status: "success",
      data: message,
    });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
