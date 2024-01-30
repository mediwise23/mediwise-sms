import getCurrentUserPages from "@/actions/getCurrentUser-Page";
import prisma from "@/lib/prisma";
import sendMail from "@/lib/smtp";
import { RescheduleAppointmentSchema, UpdateAppointmentSchema } from "@/schema/appointment";
import { getAppointmentById, updateAppointmentById } from "@/service/appointment";
import { NextApiResponseServerIo } from "@/types/types";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  const { appointmentId } = req.query;
  // // always use this in /pages/api it needs req, res arguments
  const currentUser = await getCurrentUserPages(req, res);

  if (!currentUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId as string,
    }
  })

  if (!appointmentId || !appointment) {
    return res
      .status(404)
      .json({ message: "appointment ID/Appointment not found" });
  }

  if (req.method === "PATCH") {
    const body = await UpdateAppointmentSchema.safeParseAsync(req.body);

    if (!body.success) {
      return res.status(404).json({
        errors: body.error.flatten().fieldErrors,
        message: "Invalid body parameters",
      });
    }

    const { title, doctorId, patientId, date, status, image_path } =
        body.data;

      const appointmentUpdated = await prisma.appointment.update({
        where: {
          id: appointmentId as string,
        },
        data: {
          title,
          doctorId,
          patientId,
          date,
          status,
          image_path,
        },
        include: {
          doctor: {
            include: {
              profile:true
            }
          },
          patient: {
            include: {
              profile:true
            }
          }
        }
      })  

     const notification = await prisma.notification.create({
        data: {
          content: `${appointmentUpdated.doctor.profile?.firstname} ${appointmentUpdated.doctor.profile?.lastname} ${appointmentUpdated.status.toLocaleLowerCase()} your appointment`,
          appointmentId: appointmentUpdated.id,
          userId: appointmentUpdated.patientId,
        }
      })

      const content = `
    <div> 
      <h3> hello ${appointmentUpdated.patient.profile?.firstname} ${appointmentUpdated.patient.profile?.lastname} </h3>
      <p> ${appointmentUpdated.doctor.profile?.firstname} ${appointmentUpdated.doctor.profile?.lastname} ${appointmentUpdated.status.toLocaleLowerCase()} your appointment </p>
      <small> - SMS ADMIN </small>
    </div>
    `;

    sendMail({ content, subject: "Email verification", emailTo: appointmentUpdated.patient.email as string });

      const Key = `notification:${notification.userId}:create`;
            console.log("new notification socket:", Key);
            res.socket?.server?.io.emit(Key, notification);


      return res.status(200).json(appointmentUpdated);

  } 
  if (req.method === "PUT") {
    const body = await RescheduleAppointmentSchema.safeParseAsync(req.body);

    if (!body.success) {
      return res.status(404).json({
        errors: body.error.flatten().fieldErrors,
        message: "Invalid body parameters",
      });
    }

    const { date } =
        body.data;

      const appointmentUpdated = await prisma.appointment.update({
        where: {
          id: appointmentId as string,
        },
        data: {
          date: new Date(date)
        },
        include: {
          doctor: {
            include: {
              profile:true
            }
          },
          patient: {
            include: {
              profile:true
            }
          }
        }
      })  

     const notification = await prisma.notification.findFirst({
      where: {
        appointmentId: appointmentId as string
      }
      })

      const updatedNotification = await prisma.notification.update({
        where: {
          id: notification?.id as string
        },
          data: {
            content: `${appointmentUpdated.doctor.profile?.firstname} ${appointmentUpdated.doctor.profile?.lastname} your appointment has been rescheduled`,
            appointmentId: appointmentUpdated.id,
            userId: appointmentUpdated.patientId,
            isRead:false,
            createdAt: new Date()
          }
        })

      const content = `
    <div> 
      <h3> hello ${appointmentUpdated.patient.profile?.firstname} ${appointmentUpdated.patient.profile?.lastname} </h3>
      <p> ${appointmentUpdated.doctor.profile?.firstname} ${appointmentUpdated.doctor.profile?.lastname} your appointment has been rescheduled </p>
      <small> - SMS ADMIN </small>
    </div>
    `;

    sendMail({ content, subject: "Appointment Reschedule", emailTo: appointmentUpdated.patient.email as string });
      const Key = `notification:${updatedNotification.userId}:create`;
      res.socket?.server?.io.emit(Key, notification);
      return res.status(200).json(appointmentUpdated);
  } 
  
  
  else {
    // Handle any other HTTP method
    return res.status(405).json({ message: "Invalid HTTP method!" });
  }
}
