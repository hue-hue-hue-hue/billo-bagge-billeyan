import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

// GET single result
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log(params.id);
  try {
    const result = await prisma.cA_agent.findFirst({
      where: {
        CAID: params.id,
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
