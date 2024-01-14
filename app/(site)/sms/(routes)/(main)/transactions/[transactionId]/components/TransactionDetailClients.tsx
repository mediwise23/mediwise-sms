"use client";
import { DataTable } from "@/components/DataTable";
import {
  useMutateProcessor,
  useQueryProcessor,
} from "@/hooks/useTanstackQuery";
import { TBarangay } from "@/schema/barangay";
import { TItemSms } from "@/schema/item-sms";
import { TSupplierSchema } from "@/schema/supplier";
import { TUser } from "@/schema/user";
import {
  TItemTransaction,
  TRequestedItem,
  TUpdateItemTransaction,
  TUpdateItemTransactionSchemaStatus,
  UpdateItemTransactionSchema,
} from "@/schema/item-transaction";
import {
  ItemTransaction,
  ItemTransactionStatus,
  RequestedItem,
} from "@prisma/client";
import { FileIcon } from "lucide-react";
import { Session } from "next-auth";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { columns } from "./column";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TransactionDetailClientProps = {
  currentUser: Session["user"];
};
const TransactionDetailClient: React.FC<TransactionDetailClientProps> = ({
  currentUser,
}) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  const searchParams = useParams();
  const transactionId = searchParams?.transactionId;

  const transaction = useQueryProcessor<
    ItemTransaction & {
      barangay: TBarangay;
      barangayUser: TUser;
      requested_items: (RequestedItem & { item: TItemSms })[];
    }
  >({
    url: `/transactions/${transactionId}`,
    key: ["transactions", transactionId],
  });

  const items = useQueryProcessor<(TItemSms & { supplier: TSupplierSchema })[]>(
    {
      url: "/sms-item",
      key: ["inventory-items", "sms"],
      options: {
        enabled: transaction.data?.status === 'PENDING'
      }
    }
  );

  const updateStatus = useMutateProcessor<TUpdateItemTransaction, unknown>({
    url: `/transactions/${transactionId}`,
    key: ["transactions", transactionId],
    method: "PATCH",
  });

  const [itemsState, setItemsState] = useState<any>([]);
  useEffect(() => {
    setItemsState(
      items?.data?.map((item) => ({
        itemId: item?.id,
        quantity: 0,
        name: item?.name,
        stock: item?.stock,
        unit: item?.unit,
        supplier: item.supplier?.name,
      }))
    );
  }, [items.status]);

  const submitItem = useMutateProcessor({
    url: `/transactions/${transactionId}`,
    key: ["items"],
    method: "PUT",
  });

  const onSubmit = () => {
    const items = itemsState.filter((item: any) => item.quantity > 0 && {});

    submitItem.mutate(items);
  };

  return (
    <div className="flex flex-col p-5 w-full gap-y-5">
      <h1 className="text-3xl font-semibold my-5">Request Details</h1>
      <div className="flex flex-col w-full">
        <section className="flex flex-col gap-y-5 items-start">
          <span>
            <label htmlFor="" className="font-semibold text-[#17A2B8]">
              Barangay Name
            </label>
            <p> {transaction.data?.barangay?.name}</p>
          </span>

          <span>
            <label htmlFor="" className="font-semibold text-[#17A2B8]">
              Remarks / Description
            </label>
            <p>{transaction.data?.description}</p>
          </span>

          <span className="flex flex-col">
            <label htmlFor="" className="font-semibold text-[#17A2B8]">
              Status
            </label>
            <p>{transaction.data?.status}</p>
            {/* <Badge
              className={cn(
                "",
                transaction.data?.status === "PENDING" && "bg-zinc-400",
                transaction.data?.status === "ONGOING" && "bg-blue-400",
                (transaction.data?.status === "REJECTED" ||
                  transaction.data?.status === "CANCELLED") &&
                  "bg-rose-400",
                transaction.data?.status === "COMPLETED" && "bg-primary"
              )}
            >
              {transaction.data?.status}
            </Badge> */}
          </span>

          <span>
            <div className="relative flex items-center p-2 mt-2 rounded-md flex-col">
              <FileIcon className="h-10 w-10 fill-green-200" />
              <a
                target="_blank"
                href={transaction.data?.fileReport as string}
                className="ml-2 text-sm text-green-400 dark:text-green-300 hover:underline"
              >
                View report
              </a>
            </div>
          </span>
        </section>

        {(() => {
          if (transaction.data?.status === "PENDING")
            return (
              <section className="flex flex-col w-full">
                <div className="flex w-full border-t border-b">
                  <div className="flex-1 font-semibold p-5">Item Name</div>
                  <div className="flex-1 font-semibold p-5">Stock</div>
                  <div className="flex-1 font-semibold p-5">Supplier name</div>
                  <div className="flex-1 font-semibold p-5">Action</div>
                </div>

                <div className="h-[300px] overflow-y-auto">
                  {itemsState?.map((item: any) => {
                    return (
                      <div className="flex w-full">
                        <div className="flex-1 p-5">{item?.name}</div>
                        <div className="flex-1 p-5">
                          {item?.stock} {item.unit}
                        </div>
                        <div className="flex-1 p-5">{item.supplier}</div>
                        <div className="flex gap-x-3 flex-1 items-center p-5">
                          <Button
                            variant="ghost"
                            size={"icon"}
                            onClick={() => {
                              setItemsState((prev: any) => {
                                const data = prev?.find(
                                  (itemState: any) =>
                                    itemState.itemId === item.itemId
                                );
                                if (!!data && data.quantity - 1 >= 0) {
                                  const updateItem = {
                                    ...data,
                                    quantity: data.quantity - 1,
                                  };
                                  return prev?.map((itemState: any) =>
                                    item.itemId === itemState.itemId
                                      ? updateItem
                                      : itemState
                                  );
                                }
                                return prev;
                              });
                            }}
                          >
                            -
                          </Button>
                          {item.quantity}

                          <Button
                            variant="ghost"
                            size={"icon"}
                            onClick={() => {
                              setItemsState((prev: any) => {
                                const data = prev?.find(
                                  (itemState: any) =>
                                    itemState.itemId === item.itemId
                                );
                                if (!!data && data.quantity + 1 <= data.stock) {
                                  const updateItem = {
                                    ...data,
                                    quantity: data.quantity + 1,
                                  };
                                  return prev?.map((itemState: any) =>
                                    item.itemId === itemState.itemId
                                      ? updateItem
                                      : itemState
                                  );
                                }
                                return prev;
                              });
                            }}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-x-3 mx-auto">
                  <Button className="flex w-fit" variant={"destructive"}>
                    Cancel
                  </Button>
                  <Button className="flex w-fit" onClick={onSubmit}>
                    Submit
                  </Button>
                </div>
              </section>
            );

          if (
            transaction.data?.status === "ONGOING" ||
            transaction.data?.status === "COMPLETED"
          ) {
            return (
              <section className="flex flex-col w-full">
                <div className="flex w-full border-t border-b">
                  <div className="flex-1 font-semibold p-5">Item Name</div>
                  <div className="flex-1 font-semibold p-5">Stock</div>
                </div>

                <div className="h-[300px] overflow-y-auto">
                  {transaction.data.requested_items?.map(({ item, quantity }) => {
                    return (
                      <div className="flex w-full">
                        <div className="flex-1 p-5">{item?.name}</div>
                        <div className="flex-1 p-5">
                          {quantity} {item.unit}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {transaction.data?.status === "ONGOING" && (
                  <div className="flex gap-x-3 mx-auto">
                    <Button
                      className="flex w-fit"
                      variant={"destructive"}
                      onClick={() => {
                        updateStatus.mutate({
                          status: "CANCELLED",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex w-fit"
                      onClick={() => {
                        updateStatus.mutate({ status: "COMPLETED" });
                      }}
                    >
                      Mark as completed
                    </Button>
                  </div>
                )}
              </section>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default TransactionDetailClient;
