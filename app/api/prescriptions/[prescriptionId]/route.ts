import { withAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = withAuth(
    async ({ req, session, params }) => {
      try {
        const prescription = await prisma.prescription.findUnique({
            where: {
                id: params?.prescriptionId as string
            }
        })
  
        if (!prescription) {
          return NextResponse.json(
            {
              message: "Prescription not found",
            },
            { status: 404 }
          );
        }
  
        const deletedPrescription = await prisma.prescription.delete({
            where: {
                id: prescription.id
            }
        })
  
        return NextResponse.json(deletedPrescription);
      } catch (error) {
        console.log("[APPOINMENT_DELETE_BY_ID]", error);
        return new NextResponse("Internal error", { status: 500 });
      }
    },
    {
      requiredRole: ["ADMIN", "DOCTOR", "PATIENT"],
    }
  );
  