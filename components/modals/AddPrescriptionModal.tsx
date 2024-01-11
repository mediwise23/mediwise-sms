"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FileIcon, X, Download } from "lucide-react";
import toast from "react-hot-toast";
import { useMutateProcessor } from "@/hooks/useTanstackQuery";
import { useToast } from "../ui/use-toast";
import axios, { AxiosError } from "axios";
import { Loader2 } from "../ui/Loader";
import { CreatePrescriptionSchema, TCreatePrescriptionSchema } from "@/schema/prescriptions";
import { dataURItoBlob, uploadPhoto } from "@/lib/utils";
import {ocrSpace} from 'ocr-space-api-wrapper'

// type and validation for excel sheet to json

const AddPrescriptionModal = () => {

  const { isOpen, onClose, type, data} = useModal();

  
  const isModalOpen = isOpen && type === "addPrescription";

  // converting sheet to json and api request
  
    const form = useForm<TCreatePrescriptionSchema>({
      resolver: zodResolver(CreatePrescriptionSchema),
      mode: 'all',
      defaultValues: {
        userId: data?.user?.id
      }
    })
    const {toast} = useToast()
    const onHandleClose = () => {
      onClose()
      form.reset()
  }

    useEffect(() => {
      if(data.user) {
        form.setValue('userId', data.user.id)
      }
    }, [isModalOpen])

    const createPrescription = useMutateProcessor<TCreatePrescriptionSchema, unknown>({
      url: '/prescriptions',
      method: 'POST',
      key: ['prescriptions'],
    })

    const isLoading = form.formState.isSubmitting || createPrescription.status == 'pending'
    const onSubmit: SubmitHandler<TCreatePrescriptionSchema> = async (values) => {

      const file = dataURItoBlob(values.image)

      const {public_id, url} = await uploadPhoto(file as File)

      createPrescription.mutate({userId:values.userId, image: url}, {
        onError(error, variables, context) {
          toast({
            title:'Upload prescription failed',
            description: 'Your prescription did not upload',
            variant: 'destructive'
          })
        },
        onSuccess(data, variables, context) {
          toast({
            title:'Upload prescription success',
            description: 'Your prescription has been uploaded and converted into text'
          })
          onHandleClose()
        },
      })
    };

  return (
    <Dialog open={isModalOpen} onOpenChange={onHandleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden dark:bg-[#020817] dark:text-white">
        <DialogHeader className="pt-3 px-6">
          <DialogTitle className="text-2xl text-center font-bold m-2 dark:text-white">
            Add new prescription{" "}
          </DialogTitle>

          <DialogDescription className="text-center text-zinc m-2 font-semibold dark:text-white">
            Upload your prescription and convert into text
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-21 ">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center mt-5">
                {(() => {
                  const value = form.getValues("image");
                  if (!value) {
                    return (
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <label
                              htmlFor="upload"
                              className=" hover:bg-zinc-200 w-[60%] transition-all m-auto cursor-pointer py-5 border-zinc-300 border-2 rounded-lg flex flex-col justify-center items-center gap-5 "
                            >
                              <Download className=" text-gray-400 ml-2 h-10 w-10 " />
                              <span className="text-[#42579E] text-sm font-semibold">
                                Choose a file
                              </span>
                              <span className="text-xs text-zinc-500 font-semibold">
                              Photo (png, jpg, etc)
                              </span>
                            </label>
                            <FormControl>
                              <Input
                                className="hidden"
                                id="upload"
                                type="file"
                                disabled={isLoading}
                                accept="image/*"
                                onChange={(e) => {
                                  if (e?.target?.files?.[0]) {
                                    const reader = new FileReader();
                                    reader.readAsDataURL(e?.target?.files?.[0]);
  
                                    reader.onloadend = () => {
                                      field.onChange(reader.result);
                                    };
                                  } else {
                                    field.onChange("");
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  }

                  return (
                    <div className="relative flex items-center p-2 mt-2 rounded-md">
                      <img src={value} className="max-w-[200px] max-h-[300px]" />
                      <button
                      disabled={isLoading}
                        onClick={() => {
                          form.setValue("image", '');
                          form.reset();
                        }}
                        className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
            <DialogFooter className="px-6 py-4">
              <Button variant={"default"} className=" dark:text-white" disabled={isLoading}>
                {(() => {
                  if (isLoading)
                    return (
                      <div className="flex items-center gap-x-3">
                        {" "}
                        Uploading <Loader2 size={20} />
                      </div>
                    );

                  return "Upload";
                })()}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPrescriptionModal;
