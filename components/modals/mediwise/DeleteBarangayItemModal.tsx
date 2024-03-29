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

const DeleteBarangayItemModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const isModalOpen = isOpen && type === "deleteBarangayItem";

  const deleteBarangayItem = useMutateProcessor<string, unknown>({
    url: `/brgy-item/${data?.brgyItem?.id}`, 
    method:"DELETE", 
    key: ["inventory-items", "barangay"],
});

  const onCancel = () => {
    onClose();
  };

  const onConfirm = async () => {
    try {
        deleteBarangayItem.mutate(data.prescription?.id as string, {
        onSuccess() {
          toast.success(`Item has been deleted`);
          onClose();
        },
        onError() {
          toast.error(`Something went wrong...`);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">Delete Item</DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this?
            <br />
            This Item will be permanently{" "}
            <span className="text-rose-500 font-semibold">deleted</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4 ">
          <div className="flex items-center justify-between w-full">
            <Button
              className=""
              disabled={deleteBarangayItem.isPending}
              onClick={onCancel}
              variant={"ghost"}
            >
              Cancel
            </Button>
            <Button
              className="text-white"
              disabled={deleteBarangayItem.isPending}
              onClick={onConfirm}
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

export default DeleteBarangayItemModal;
