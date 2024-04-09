"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useMutateProcessor } from "@/hooks/useTanstackQuery";
import { TUpdateItemTransactionSchemaStatus } from "@/schema/item-transaction";
import { ItemTransactionStatus } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

const ConfirmRequestModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const isModalOpen = isOpen && type === "confirmRequest";

  const updateStatus = useMutateProcessor<
    TUpdateItemTransactionSchemaStatus,
    unknown
  >({
    url: "/transactions/barangay",
    method: "PATCH",
    key: ["transactions-barangay"],
  });
  const { toast } = useToast();
  const updateRequestStatus = (id: string, status: ItemTransactionStatus) => {
    updateStatus.mutate(
      {
        status: "CANCELLED",
        id,
      },
      {
        onSuccess(data) {
        //   toast({
        //     title: `Request has been updated`,
        //   });
          onClose();
        },
        onError(error, variables, context) {
        //   toast({
        //     title: `Something went wrong`,
        //     variant: "destructive",
        //   });
          onClose();
        },
      }
    );
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">Confirm Request</DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Did you receive the requested items??
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4 ">
          <div className="flex items-center justify-between w-full">
            <Button
              className=""
              disabled={updateStatus.isPending}
              onClick={onCancel}
              variant={"ghost"}
            >
              Cancel
            </Button>
            <Button
              className="text-white"
              disabled={updateStatus.isPending}
              onClick={() => updateRequestStatus(data?.transactionRequest?.id as string, 'COMPLETED')}
              variant={"default"}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmRequestModal;
