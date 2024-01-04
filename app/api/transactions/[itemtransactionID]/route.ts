import { withAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  TItemTransaction,
  TRequestedItem,
  UpdateItemTransactionSchema,
} from "@/schema/item-transaction";
import {
  checkIfAllItemsAreAvailable,
  deleteItemTransaction,
  getItemTransactionById,
  updateItemTransaction,
} from "@/service/item-transaction";
import { ItemTransactionStatus, Role } from "@prisma/client";

import { NextResponse } from "next/server";

export const GET = withAuth(
  async ({ req, session, params }) => {
    try {
      const transaction = await getItemTransactionById({
        id: params.itemtransactionID,
      });

      if (!transaction) {
        return NextResponse.json(
          {
            message: "Transaction not found",
          },
          { status: 404 }
        );
      }

      return NextResponse.json(transaction);
    } catch (error) {
      console.log("[GET_ITEMTRANSACTION_BY_ID]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  },
  {
    requiredRole: ["ADMIN", "STOCK_MANAGER"],
    allowAnonymous: true,
  }
);

export const PATCH = withAuth(
  async ({ req, session, params }) => {
    try {
      const body = await UpdateItemTransactionSchema.safeParseAsync(
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

      const transaction = await getItemTransactionById({
        id: params.itemtransactionID,
      });

      if (!transaction || !transaction.requested_items) {
        return NextResponse.json(
          {
            message: "Transaction not found",
          },
          { status: 404 }
        );
      }

      const formattedRequestedItems = transaction.requested_items.map(
        (item) => {
          return {
            id: item.id,
            quantity: item.quantity,
          };
        }
      );

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
              "Could not proceed to update transaction because some of the requested items are not available or out of stock",
          },
          { status: 400 }
        );
      }

      let transactionUpdate: TItemTransaction | null = null;

      const isStatusAllowed = (
        status: string,
        allowedStatus: ItemTransactionStatus[]
      ) => {
        return allowedStatus.includes(status as ItemTransactionStatus);
      };

      if (
        session.user.role === Role.STOCK_MANAGER &&
        transaction.status === ItemTransactionStatus.PENDING &&
        isStatusAllowed(body.data.status, ["ACCEPTED", "REJECTED"])
      ) {
        /* 
          if the current transaction is pending and if the stock manager accepts or rejects the transaction

          if the stock manager accepts the transaction, the status of the transaction will be changed to ACCEPTED and the delivery status is ON THE WAY
          if the stock manager rejects the transaction, the status of the transaction will be changed to REJECTED
        */

        transactionUpdate = await updateItemTransaction({
          id: params.itemtransactionID,
          data: {
            status: body.data.status, // data can be ACCEPTED or REJECTED
          },
        });
      } else if (
        session.user.role === Role.ADMIN &&
        transaction.status === ItemTransactionStatus.ACCEPTED &&
        isStatusAllowed(body.data.status, ["COMPLETED"])
      ) {
        /* 
          if the current transaction is ACCEPTED and if the barangay admin confirms the received items 
        */

        transactionUpdate = await updateItemTransaction({
          id: params.itemtransactionID,
          data: {
            status: body.data.status,
          },
        });
      } else if (
        session.user.role === Role.ADMIN &&
        transaction.status === ItemTransactionStatus.PENDING &&
        isStatusAllowed(body.data.status, ["CANCELLED"])
      ) {
        /* 
          if the current transaction is PENDING and if the barangay user cancels the transaction
        */

        transactionUpdate = await updateItemTransaction({
          id: params.itemtransactionID,
          data: {
            status: body.data.status,
          },
        });
      }

      return NextResponse.json(transactionUpdate, { status: 201 });
    } catch (error) {
      console.log("[ITEMTRANSACTION_PATCH]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  },
  {
    requiredRole: ["ADMIN", "STOCK_MANAGER"],
  }
);

export const DELETE = withAuth(
  async ({ req, session, params }) => {
    try {
      const transaction = await getItemTransactionById({
        id: params.itemtransactionID,
      });

      if (!transaction || !transaction.requested_items) {
        return NextResponse.json(
          {
            message: "Transaction not found",
          },
          { status: 404 }
        );
      }

      // only allow to delete transaction if the status is PENDING
      if (transaction.status !== ItemTransactionStatus.PENDING) {
        return NextResponse.json(
          {
            message:
              "Could not delete transaction because the status is not PENDING",
          },
          { status: 400 }
        );
      }

      const itemDeleted = await deleteItemTransaction({
        id: params.itemtransactionID,
      });

      return NextResponse.json(itemDeleted, { status: 200 });
    } catch (error) {
      console.log("[ITEMTRANSACTION_DELETE]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  },
  {
    requiredRole: ["STOCK_MANAGER"],
  }
);
