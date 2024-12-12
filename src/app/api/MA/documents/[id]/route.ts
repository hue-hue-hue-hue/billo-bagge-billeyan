import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // const samosa = await prisma.mergerAcquisition.findMany();
    // console.log(samosa);
    const document = await prisma.mergerAcquisition.findFirst({
      where: { conversation_id: params.id },
    });

    if (!document) {
      return NextResponse.json(
        { status: "error", message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: "success", data: document });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
