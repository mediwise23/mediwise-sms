"use client";
import React, { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/hooks/useModalStore";
import {
  useMutateProcessor,
  useQueryProcessor,
} from "@/hooks/useTanstackQuery";
import toast from "react-hot-toast";

import { Gender, Role } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import {
  CreatePatientSchema,
  TCreatePatientSchema,
  TUser,
} from "@/schema/user";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "@/components/ui/Loader";

const CreatePatientModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const isModalOpen = isOpen && type === "createPatient";
  const { toast } = useToast();

  const onHandleClose = () => {
    onClose();
    form.reset();
  };
  const [page, setPage] = useState(1);

  const form = useForm<TCreatePatientSchema>({
    resolver: zodResolver(CreatePatientSchema),
    defaultValues: {
      city: "Caloocan",
      zip: "1400",
    },
    mode: "all",
  });

  useEffect(() => {
    if (data.user) {
      form.setValue("barangay", data.user.barangayId as string);
      form.setValue("role", Role.PATIENT);
      form.setValue("isVerified", true);
    }

    return () => {
      form.reset();
      setPage(1);
    };
  }, [isModalOpen]);

  const createPatient = useMutateProcessor<TCreatePatientSchema, TUser>({
    url: `/users/patients`,
    key: ["patients", "barangay", data.user?.barangayId],
    method: "POST",
  });

  const isLoading =
    form.formState.isSubmitting || createPatient.status === "pending";

  const onSubmit: SubmitHandler<TCreatePatientSchema> = async (values) => {
    createPatient.mutate(values, {
      onSuccess(data, variables, context) {
        console.log(data);
        toast({
          title: "Patient created",
          description: `Patient with email of ${values.email} has been created`,
        });
      },
      onError(error, variables, context) {
        console.log(error);
        toast({
          title: "Something went wrong.",
          description: `Patient failed to create`,
        });
      },
    });
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onHandleClose}>
        <DialogContent className="max-h-[90vh] w-[500px] max-w-[90vw] overflow-y-auto dark:bg-[#020817] dark:text-white">
          <DialogHeader className="pt-3 px-6">
            <DialogTitle className="text-2xl text-center font-bold m-2 dark:text-white">
              Add patient
            </DialogTitle>

            <DialogDescription className="text-center text-zinc m-2 font-semibold dark:text-white">
              Add information about the patient
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-5"
            >
              {(() => {
                if (page === 1) {
                  return (
                    <>
                      <div className="flex gap-x-3">
                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="firstname"
                            key="firstname"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                  First Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    key={"firstname"}
                                    disabled={isLoading}
                                    className="bg-transparent focus-visible:ring-0  focus-visible:ring-offset-0"
                                    placeholder={`Enter firstname`}
                                    {...field}
                                    value={field.value}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="lastname"
                            key="lastname"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                  Last Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isLoading}
                                    className="bg-transparent focus-visible:ring-0  focus-visible:ring-offset-0 resize-none"
                                    placeholder={`Enter lastname`}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex gap-x-3">
                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="middlename"
                            key={"middlename"}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                  Middlename (optional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isLoading}
                                    className="bg-transparent focus-visible:ring-0  focus-visible:ring-offset-0 resize-none"
                                    placeholder={`Enter middlename`}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="suffix"
                            key={"suffix"}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                  suffix (optional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isLoading}
                                    className="bg-transparent focus-visible:ring-0  focus-visible:ring-offset-0 resize-none"
                                    placeholder={`Enter suffix`}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex gap-x-3">
                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="dateOfBirth"
                            key="dateOfBirth"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                  Birthday
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isLoading}
                                    className="bg-transparent focus-visible:ring-0  focus-visible:ring-offset-0 resize-none"
                                    type="date"
                                    placeholder={`Enter birthdate`}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="gender"
                            key={"gender"}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                  Select gender
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="bg-transparent">
                                      <SelectValue placeholder="Select a gender" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value={Gender.MALE}>
                                      {Gender.MALE}
                                    </SelectItem>
                                    <SelectItem value={Gender.FEMALE}>
                                      {Gender.FEMALE}
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </>
                  );
                }

                if (page === 2) {
                  return (
                    <>
                      <div className="flex gap-x-3">
                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="email"
                            key="email"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                  Email
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isLoading}
                                    className=" focus-visible:ring-0  focus-visible:ring-offset-0 resize-none"
                                    placeholder={`Enter email`}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="contactNo"
                            key="contactNo"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                  Contact No.
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isLoading}
                                    type="number"
                                    className=" focus-visible:ring-0  focus-visible:ring-offset-0 resize-none"
                                    placeholder={`Enter contact number`}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex gap-x-3">
                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="homeNo"
                            key="homeNo"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                  Home No.
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    key={"homeNo"}
                                    type="number"
                                    disabled={isLoading}
                                    className=" focus-visible:ring-0  focus-visible:ring-offset-0 resize-none"
                                    placeholder={`Enter home no.`}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="street"
                            key="street"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                  Street
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isLoading}
                                    className=" focus-visible:ring-0  focus-visible:ring-offset-0 resize-none"
                                    placeholder={`Enter street`}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex gap-x-3">
                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="city"
                            key="city"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                  City
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={true}
                                    className=" focus-visible:ring-0  focus-visible:ring-offset-0 resize-none"
                                    placeholder={`Enter city`}
                                    value={field.value}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="zip"
                            key="zip"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                  zip
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={true}
                                    className=" focus-visible:ring-0  focus-visible:ring-offset-0 resize-none"
                                    placeholder={`Enter zip`}
                                    value={field.value}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </>
                  );
                }
              })()}

              <DialogFooter className="py-4">
                {(() => {
                  if (page === 1) {
                    return (
                      <div className="flex justify-between">
                        <Button type="button" onClick={() => setPage(2)}>
                          Next
                        </Button>
                      </div>
                    );
                  }

                  if (page === 2) {
                    return (
                      <div className="flex justify-between w-full">
                        <Button type="button" onClick={() => setPage(1)}>
                          Prev
                        </Button>
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
                                  Saving <Loader2 size={20} />
                                </div>
                              );
                            return "Add patient";
                          })()}
                        </Button>
                      </div>
                    );
                  }
                })()}
                {/* */}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePatientModal;
