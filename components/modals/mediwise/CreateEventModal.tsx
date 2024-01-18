"use client";
import React, { useEffect } from "react";

import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/hooks/useModalStore";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { CreateEventSchema, TCreateEventSchema } from "@/schema/event";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "@/components/ui/Loader";

const CreateEventModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const isModalOpen = isOpen && type === "createEvent";

  const onHandleClose = () => {
    onClose();
  };

  const { calendarApi } = data;

  const form = useForm<TCreateEventSchema>({
    resolver: zodResolver(CreateEventSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      allDay: false,
    },
    mode: "all",
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (calendarApi) {
      form.setValue("id", createId());
      form.setValue("start", calendarApi.startStr);
      form.setValue("end", calendarApi.endStr);
      form.setValue("allDay", calendarApi.allDay);
    }

    return () => {
      form.reset();
    };
  }, [calendarApi, form]);

  const onSubmit: SubmitHandler<TCreateEventSchema> = async (values) => {
    calendarApi?.view?.calendar?.addEvent(values);
    console.log(values);
  };
  console.log(form.formState.errors);
  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onHandleClose}>
        <DialogContent className="text-black max-h-[90vh] w-[500px] max-w-[90vw] overflow-y-auto dark:bg-[#020817] dark:text-white">
          <DialogHeader className="pt-3 px-6">
            <DialogTitle className="text-2xl text-center font-bold m-2 dark:text-white">
              Create Event{" "}
            </DialogTitle>

            <DialogDescription className="text-center text-zinc m-2 font-semibold dark:text-white">
              Customize the title, description, time and date of your event.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="w-full mt-5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                          type="type"
                          placeholder={`Enter title`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full mt-5">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          cols={7}
                          rows={7}
                          className="focus-visible:ring-0 focus-visible:ring-offset-0 resize-none bg-transparent"
                          placeholder={`Enter description`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className=" py-4">
                <Button
                  variant={"default"}
                  type="submit"
                  className=" dark:text-white"
                  disabled={isLoading}
                >
                  {(() => {
                    if (isLoading)
                      return (
                        <div className="flex items-center gap-x-3">
                          {" "}
                          Adding event <Loader2 size={20} />
                        </div>
                      );
                    return "Add event";
                  })()}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateEventModal;
