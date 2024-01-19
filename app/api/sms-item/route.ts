import { withAuth } from "@/lib/auth";
import { CreateSmsItemSchema, ItemSmsGetQuerySchema } from "@/schema/item-sms";

import { createSmsItem, getAllSmsItem } from "@/service/item-sms";
import { getQueryParams } from "@/service/params";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async ({ req, session, params }) => {
    const queries = getQueryParams(req, ItemSmsGetQuerySchema);
    console.log('hello')
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
      const item = await getAllSmsItem({
        name: queries.data.name,
      });

      return NextResponse.json(item, { status: 200 });
    } catch (error) {
      console.log("[SMSITEM_GET]", error);
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
      const body = await CreateSmsItemSchema.safeParseAsync(await req.json());

      if (!body.success) {
        return NextResponse.json(
          {
            errors: body.error.flatten().fieldErrors,
            message: "Invalid body parameters",
          },
          { status: 400 }
        );
      }

      const item = await createSmsItem({
        ...body.data,
      });

      return NextResponse.json(item, { status: 201 });
    } catch (error) {
      console.log("[SMSITEM_POST]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  },
  {
    requiredRole: ["ADMIN", "STOCK_MANAGER"],
  }
);
