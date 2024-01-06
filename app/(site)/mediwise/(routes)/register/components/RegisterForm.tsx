"use client";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/hooks/useModalStore";
import {
  useMutateProcessor,
  useQueryProcessor,
} from "@/hooks/useTanstackQuery";
import { RegisterUserSchema, TRegister } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Barangay } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const { onOpen } = useModal();
  const form = useForm<TRegister>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      city: "Caloocan",
      zip: "1400",
      role: "PATIENT",
    },
    mode: "all",
  });

  const router = useRouter();
  const register = useMutateProcessor<TRegister, string>({
    url: "/auth/register",
    key: ["register"],
    method: "POST",
  });
  const barangay = useQueryProcessor<Barangay[]>({
    url: "/barangay",
    key: ["barangay"],
  });

  console.log(barangay?.data);
  const { toast } = useToast();
  const onSubmit: SubmitHandler<TRegister> = (values) => {
    console.log(values);

    register.mutate(values, {
      onSuccess(data, variables, context) {
        toast({
          title: "Registered successful",
          description: data,
        });

        setTimeout(() => {
          router.push("/mediwise");
        }, 2000);
      },
      onError(error, variables, context) {
        console.error(error);

        toast({
          title: "Registered failed",
          description: "Email already used",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className=" shadow-md w-[55%] max-h-[95%] flex rounded-md overflow-hidden">
      <section className="flex flex-[0.7] ">
        <img
          src="/images/BGPNU.jpeg"
          alt=""
          className="w-full h-full object-cover"
        />
      </section>
      <Form {...form}>
        <form
          className="flex flex-col flex-1 px-10 py-5 bg-white"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl font-semibold ">Create a free account</h1>

          <h2 className="font-semibold mt-10">
            {step === 1 ? "Personal Information" : "Account Information"}
          </h2>

          {/* slider */}
          <section className="flex h-full overflow-x-auto mt-10">
            {step === 1 && (
              <div className="flex flex-col gap-y-3 w-full">
                <div className="flex justify-evenly gap-x-3">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          Firstname
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="focus-visible:ring-0  focus-visible:ring-offset-0"
                            type="text"
                            placeholder={`Enter firstname`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="middlename"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          Middlename (optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="focus-visible:ring-0  focus-visible:ring-offset-0"
                            type="text"
                            placeholder={`Enter middlename`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-evenly gap-x-3">
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          Lastname
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="focus-visible:ring-0  focus-visible:ring-offset-0"
                            type="text"
                            placeholder={`Enter Lastname`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="suffix"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          Suffix (optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="focus-visible:ring-0  focus-visible:ring-offset-0"
                            type="text"
                            placeholder={`Enter Suffix`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-evenly gap-x-3">
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          Date of birth
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                      // <FormItem className="w-full">
                      //   <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                      //     Birthdate
                      //   </FormLabel>
                      //   <FormControl>
                      //     <Input
                      //       className="focus-visible:ring-0  focus-visible:ring-offset-0"
                      //       type="date"
                      //       placeholder={`Enter birthdate`}
                      //       {...field}
                      //     />
                      //   </FormControl>
                      //   <FormMessage />
                      // </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          Gender
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="focus-visible:ring-0  focus-visible:ring-offset-0">
                              <SelectValue placeholder="Select a gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="focus-visible:ring-0  focus-visible:ring-offset-0">
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-evenly gap-x-3">
                  <FormField
                    control={form.control}
                    name="homeNo"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          House Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="focus-visible:ring-0  focus-visible:ring-offset-0"
                            type="number"
                            placeholder={`Enter house no.`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          Street
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="focus-visible:ring-0  focus-visible:ring-offset-0"
                            type="text"
                            placeholder={`Enter street`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-evenly gap-x-3">
                  <FormField
                    control={form.control}
                    name="contactNo"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          Contact No.
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="focus-visible:ring-0  focus-visible:ring-offset-0"
                            type="number"
                            placeholder={`Enter contact number`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="barangay"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          Barangay
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus-visible:ring-0  focus-visible:ring-offset-0">
                                <SelectValue placeholder="Select a gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="focus-visible:ring-0  focus-visible:ring-offset-0">
                              {barangay?.data?.map((barangay) => (
                                <SelectItem value={barangay?.id || "null"}>
                                  Brgy {barangay.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-evenly gap-x-3">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          City
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={true}
                            className="focus-visible:ring-0  focus-visible:ring-offset-0"
                            type="text"
                            placeholder={`Enter City`}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          Zip
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="focus-visible:ring-0  focus-visible:ring-offset-0"
                            disabled={true}
                            type="number"
                            placeholder={`Enter Zip`}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-y-6 w-full">
                <div className="flex justify-evenly gap-x-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="focus-visible:ring-0  focus-visible:ring-offset-0"
                            type="email"
                            placeholder={`Enter email`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-evenly gap-x-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="focus-visible:ring-0  focus-visible:ring-offset-0"
                            type="password"
                            placeholder={`Enter password`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-evenly gap-x-3">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="focus-visible:ring-0  focus-visible:ring-offset-0"
                            type="password"
                            placeholder={`Enter password confirmation`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </section>

          <div className="flex mt-10 w-full gap-x-5 justify-between">
            {step === 1 && (
              <>
                <Button
                  type="button"
                  className="mr-auto"
                  onClick={() => router.replace("/mediwise")}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  className="ml-auto"
                  onClick={() => setStep(2)}
                >
                  Next
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <Button
                  type="button"
                  className="mr-auto"
                  onClick={() => setStep(1)}
                >
                  Prev
                </Button>
                <Button type="submit" className="ml-auto">
                  Submit
                </Button>
              </>
            )}
          </div>

          <span className="text-sm text-center text-zinc-500">
            Already have an account?
            <span
              onClick={() => {
                router.push("/mediwise");
                onOpen("mediwiseLogin");
              }}
              className="underline cursor-pointer"
            >
              Sign in here
            </span>
          </span>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
