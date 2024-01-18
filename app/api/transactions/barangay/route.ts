import { withAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  CreateItemTransactionSchema,
  ItemTransactionGetQuerySchema,
  UpdateItemTransactionSchemaStatus,
} from "@/schema/item-transaction";
import {
  checkIfAllItemsAreAvailable,
  getAllItemTransaction,
} from "@/service/item-transaction";

import { getQueryParams } from "@/service/params";
import { NextRequest, NextResponse } from "next/server";

export const GET = withAuth(
  async ({ req, session, params }) => {
    const queries = getQueryParams(req, ItemTransactionGetQuerySchema);

    if (!queries.success) {
      return NextResponse.json(
        {
          errors: queries.error.flatten().fieldErrors,
          message: "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    try {
      const transaction = await prisma.itemTransaction.findFirst({
        where: {
          OR: [
            {
              barangayId: queries.data.barangayId,
              status: 'ONGOING'
            },
            {
              barangayId: queries.data.barangayId,
              status: 'PENDING'
            },
          ]
        },
        include:{
          barangay:true,
          barangayUser:true,
        }
      })
      return NextResponse.json(transaction, { status: 200 });
    } catch (error) {
      console.log("[TRANSACTION_GET]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  },
  {
    requiredRole: ["ADMIN", "STOCK_MANAGER"],
    allowAnonymous: true,
  }
);

export const POST = withAuth(
  async ({ req, session }) => {
    try {
      const body = await CreateItemTransactionSchema.safeParseAsync(
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

      // check if all the requested items are available

      const transaction = await prisma.itemTransaction.create({
        data: body.data
      })

      return NextResponse.json(transaction, { status: 201 });
    } catch (error) {
      console.log("[TRANSACTION_POST]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  },
  {
    requiredRole: ["ADMIN", "STOCK_MANAGER"],
  }
);

export const PATCH = withAuth(
  async ({ req, session }) => {
    try {
      const body = await UpdateItemTransactionSchemaStatus.safeParseAsync(
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

      // check if all the requested items are available

      const transaction = await prisma.itemTransaction.update({
        where:{
           id:body.data.id
        },
        data: {
          status:  body.data.status
        }
      })

      return NextResponse.json(transaction, { status: 201 });
    } catch (error) {
      console.log("[TRANSACTION_PATCH]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  },
  {
    requiredRole: ["ADMIN", "STOCK_MANAGER"],
  }
);