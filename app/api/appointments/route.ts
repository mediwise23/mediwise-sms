import { withAuth } from "@/lib/auth";
import {
  AppointmentGetQuerySchema,
  CreateAppointmentSchema,
} from "@/schema/appointment";
import { createAppointment, getAppointments } from "@/service/appointment";
import { getQueryParams } from "@/service/params";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment-timezone";
import prisma from "@/lib/prisma";
export async function GET(req: NextRequest, { params }: { params: {} }) {
  const queries = getQueryParams(req, AppointmentGetQuerySchema);
  if (!queries.success) {

    console.log('errrorrr')
    return NextResponse.json(
      {
        errors: queries.error.flatten().fieldErrors,
        message: "Invalid query parameters",
      },
      { status: 400 }
    );
  }

  try {
    const appointments = await getAppointments({
      status: queries.data.status,
      date: queries.data.date,
      barangayId: queries.data.barangayId,
      doctorId: queries.data.doctorId,
      patientId: queries.data.patientId,
      workScheduleId: queries.data.workScheduleId
    });
    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.log("[APPOINMENT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export const POST = withAuth(
  async ({ req, session }) => {
    try {
      const body = await CreateAppointmentSchema.safeParseAsync(
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

      const { title, doctorId, patientId, date, status, image_path, barangayId } =
      body.data;

      date.setDate(date.getDate() - 1);
      const d = moment.utc(date).tz("Asia/Manila").format();
      const today = moment.tz("Asia/Manila").startOf('day');

      const hasAppointment = await prisma.appointment.findFirst({
        where: {
          status: 'PENDING',
          patientId,
          date: {
            gt: today.toDate() // Ensures the appointment date is in the future
          }
        }
      })
      if(hasAppointment) {
        return NextResponse.json(
          {
            message: "Already have an appointment",
          },
          { status: 400 }
        );
      }

    const workSchedule = await prisma.workSchedule.findFirst({
      where: {
        OR: [
          {
            doctorId: doctorId,
            barangayId: barangayId,
            start: {
              gte: d,
            },
            isArchived: false,
          },
          {
            doctorId: doctorId,
            barangayId: barangayId,
            end: {
              gte: d,
            },
            isArchived: false,
          },
        ]
      },
      orderBy: {
        start: "desc",
      },
      include: {
        doctor: {
          include: {
            profile:true
          }
        },
      }
    });

    if(!workSchedule) {
      return NextResponse.json(
        {
          message: "Work schedule not found",
        },
        { status: 404 }
      );
    }
    
    date.setDate(date.getDate() + 1);
      const appointment = await createAppointment({
        title,
        doctorId,
        patientId,
        barangayId,
        date: date,
        status,
        image_path,
        workScheduleId: workSchedule?.id
      });

      return NextResponse.json(appointment, { status: 201 });
    } catch (error) {
      console.log("[APPOINMENT_POST]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  },
  {
    requiredRole: ["ADMIN", "DOCTOR", "PATIENT"],
  }
);
