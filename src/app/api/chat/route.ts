import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    const conversation = await prisma.chat.create({
      data: {
        title: query || "New Chat",
        messages: {
          // Optionally create first message if initial message exists
          create: query
            ? [
                {
                  role: "USER",
                  content: query,
                },
              ]
            : [],
        },
      },
      // Include messages in the response
      include: {
        messages: true,
      },
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
    const conversations = await prisma.chat.findMany();

    return NextResponse.json({ status: "success", data: conversations });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
