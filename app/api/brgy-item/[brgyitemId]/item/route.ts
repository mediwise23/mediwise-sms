import { withAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreateItemSchema } from "@/schema/item";
import { UpdateBrgyItemSchema } from "@/schema/item-brgy";
import {
  deleteBarangayItemById,
  getBarangayItemById,
  updateBarangayItemById,
} from "@/service/item-brgy";
import { NextResponse } from "next/server";
import nodeSchedule from 'node-schedule'

export const GET = withAuth(
  async ({ req, session, params }) => {
    try {
    //   const item = await getBarangayItemById(params.brgyitemId);

    //   if (!item) {
    //     return NextResponse.json(
    //       {
    //         message: "Brgy Item not found",
    //       },
    //       { status: 404 }
    //     );
    //   }

      return NextResponse.json({});
    } catch (error) {
      console.log("[BRGYITEM_GET_BY_ID]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  },
  {
    requiredRole: ["ADMIN", "DOCTOR", "STOCK_MANAGER"],
    allowAnonymous: true,
  }
);

export const POST = withAuth(
    async ({ req, session, params, currentUser }) => {
      try {
        const body = await CreateItemSchema.safeParseAsync(await req.json());
  
        if (!body.success) {
          return NextResponse.json(
            {
              message: "Product number is missing",
            },
            { status: 400 }
          );
        }

       
        const item = await prisma.item.create({
            data: {
                product_number: body.data.product_number,
                expiration_date: new Date(body.data.expiration_date),
                brgyItemId: params.brgyitemId,
            }
        })


        const reminderTime = new Date(item.expiration_date || new Date());
        reminderTime.setDate(reminderTime.getDate() - 7);
        nodeSchedule.scheduleJob(item.id, reminderTime, async () => {
        const administrators = await prisma.user.findMany({
          where: {
            role: 'ADMIN',
            barangayId: currentUser?.barangayId
          }
        })

        Promise.all(administrators.map(async(admin) => {
          const notification = await prisma.notification.create({
            data: {
              content: `Your Item will be expire in 7 days`,
              itemId:item.id,
              userId: admin.id,
            }
          })

          return notification
        }))
      })

  
        return NextResponse.json(item);
      } catch (error) {
        console.log("[BRGYITEM_POST_BY_ID]", error);
        return new NextResponse("Internal error", { status: 500 });
      }
    },
    {
      requiredRole: ["ADMIN", "DOCTOR", "STOCK_MANAGER"],
      // allowAnonymous: true,
    }
  );

// export const PATCH = withAuth(
//   async ({ req, session, params }) => {
//     try {
//     //   const body = await UpdateBrgyItemSchema.safeParseAsync(await req.json());

//     //   if (!body.success) {
//     //     return NextResponse.json(
//     //       {
//     //         errors: body.error.flatten().fieldErrors,
//     //         message: "Invalid body parameters",
//     //       },
//     //       { status: 400 }
//     //     );
//     //   }

//     //   const item = await getBarangayItemById(params.brgyitemId);

//     //   if (!item) {
//     //     return NextResponse.json(
//     //       {
//     //         message: "Item not found",
//     //       },
//     //       { status: 404 }
//     //     );
//     //   }

//     //   const itemUpdated = await updateBarangayItemById(params.brgyitemId, {
//     //     name: body.data.name,
//     //     description: body.data.description,
//     //     unit: body.data.unit,
//     //     stock: body.data.stock,
//     //     dosage: body?.data?.dosage
//     //   });

//       return NextResponse.json({}, { status: 201 });
//     } catch (error) {
//       console.log("[BRGYITEM_PATCH]", error);
//       return new NextResponse("Internal error", { status: 500 });
//     }
//   },
//   {
//     requiredRole: ["ADMIN", "DOCTOR", "STOCK_MANAGER"],
//   }
// );

export const DELETE = withAuth(
  async ({ req, session, params }) => {
    try {

        const item = await prisma.item.findUnique({
            where: {
                id: params.brgyitemId
            }
        })

      if (!item) {
        return NextResponse.json(
          {
            message: "Item not found",
          },
          { status: 404 }
        );
      }

      const deletedItem = await prisma.item.delete({
        where: {
            id: params.brgyitemId
        }
    })
      return NextResponse.json(deletedItem, { status: 200 });
    } catch (error) {
      console.log("[ITEM_DELETE]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  },
  {
    requiredRole: ["ADMIN", "DOCTOR", "STOCK_MANAGER"],
  }
);
