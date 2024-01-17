import { withAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  AppointmentGetQuerySchema,
  CreateAppointmentSchema,
} from "@/schema/appointment";
import { CreateAppointmentItemSchema } from "@/schema/appointment-item";
import { createAppointment, getAppointmentById, getAppointments } from "@/service/appointment";
import { getQueryParams } from "@/service/params";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = withAuth(
    async ({ req, session, params }) => {
      try {
        const body = await z.array(CreateAppointmentItemSchema).safeParseAsync(
          await req.json()
        );
        if (!body.success) {
          return NextResponse.json(
            {
              errors: body.error.flatten().fieldErrors,
              message: "Invalid body parameters",
            },
            { status: 400 }
          );
        }
        
        const appointment = await getAppointmentById({
            id: params.appointmentId,
          });

          if (
            !appointment ||
            !appointment.barangayId
          ) {
            return NextResponse.json(
              {
                message: "Transaction not found",
              },
              { status: 404 }
            );
          }
          console.log()

          const formattedAppointmentItems = body.data.map(
            (item) => {
              return {
                quantity: item.quantity,
                brgyItemId: item.itemId,
                appointmentId: appointment.id
              };
            }
          );

          const brgyItem = await prisma.brgyItem.findMany({
            where: {
              id: {
                in: formattedAppointmentItems.map((item) => item.brgyItemId) as string[]
              }
            }
          })

          const isNotAvailable = brgyItem.some((item) => {
            const findItem = formattedAppointmentItems.find((formattedItem) => formattedItem.brgyItemId === item.id)
            return item.stock! <= 0 || (findItem && item?.stock! < findItem?.quantity)
          })


          if (isNotAvailable) {
            return NextResponse.json(
              {
                message:
                  "Could not proceed to update transaction because some of the requested items are not available or out of stock",
              },
              { status: 400 }
            );
          }

          formattedAppointmentItems.forEach(async (brgyItem) => (
            prisma.brgyItem.update({
              where: {
                id: brgyItem.brgyItemId as string,
              },
              data: {
                stock: {
                  decrement: brgyItem.quantity
                }
              }
            })
          ))

          const appointmentItems = await prisma.appointment_item.createMany({
            data:formattedAppointmentItems
          })
          
          console.log(appointmentItems)

        return NextResponse.json(appointmentItems, { status: 201 });
      } catch (error) {
        console.log("[APPOINMENT_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
      }
    },
    {
      requiredRole: ["ADMIN", "DOCTOR", "PATIENT"],
    }
  );
  