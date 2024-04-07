import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: {} }) {
    try {
        const illness = await prisma.appointment.groupBy({
            by: ['illness'],
            _count: {
                illness:true
            },
            where: {
              illness: {
                not: ""
              }
            }
        })
      return NextResponse.json(illness, { status: 200 });
    } catch (error) {
      console.log("[APPOINMENT_ILLNESS_GET]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }