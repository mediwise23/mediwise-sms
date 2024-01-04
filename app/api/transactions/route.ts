import { withAuth } from "@/lib/auth";
import {
  CreateItemTransactionSchema,
  ItemTransactionGetQuerySchema,
} from "@/schema/item-transaction";
import {
  checkIfAllItemsAreAvailable,
  createItemTransaction,
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
      const transaction = await getAllItemTransaction({
        data: queries.data,
      });

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

      const formattedRequestedItems = body.data.requestedItems.map((item) => {
        return {
          id: item.itemId,
          quantity: item.quantity,
        };
      });

      // check if all the requested items are available
      const isSmsItemsAvailable = await checkIfAllItemsAreAvailable({
        data: {
          requested_items: formattedRequestedItems,
        },
      });

      if (!isSmsItemsAvailable) {
        return NextResponse.json(
          {
            message:
              "Could not proceed to create a transaction because some of the requested items are not available or out of stock",
          },
          { status: 400 }
        );
      }

      const transaction = await createItemTransaction({
        data: body.data,
      });

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
