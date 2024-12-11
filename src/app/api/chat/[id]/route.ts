import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const conversation = await prisma.chat.findUnique({
      where: { id: params.id },
    });

    if (!conversation) {
      return NextResponse.json(
        { status: "error", message: "Not found" },
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

// post request to create chat with given id and data
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json();
    const conversation = await prisma.chat.create({
      data: { ...json, id: params.id },
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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json();
    const updatedConversation = await prisma.chat.update({
      where: { id: params.id },
      data: json,
    });

    return NextResponse.json({ status: "success", data: updatedConversation });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.chat.delete({ where: { id: params.id } });
    return NextResponse.json({
      status: "success",
      message: "Deleted successfully",
    });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
