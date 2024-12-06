import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log(params.id);
  try {
    const result = await prisma.result.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching result" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const result = await prisma.result.update({
      where: {
        id: params.id,
      },
      data: body,
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating result" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const result = await prisma.result.update({
      where: {
        id: params.id,
      },
      data: body,
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating result" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.result.delete({
      where: {
        id: params.id,
      },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting result" },
      { status: 500 }
    );
  }
}
