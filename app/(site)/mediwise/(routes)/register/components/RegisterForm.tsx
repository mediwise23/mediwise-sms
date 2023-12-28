"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useToast } from "@/components/ui/use-toast";
import { useMutateProcessor } from "@/hooks/useTanstackQuery";
import {
  LoginUserSchemaType,
  RegisterUserSchema,
  RegisterUserSchemaType,
  UserSchemaType,
} from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const form = useForm<RegisterUserSchemaType>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      city: "Caloocan",
      zip: "1400",
      role: "PATIENT",
    },
    mode: "all",
  });

  const router = useRouter();
  const register = useMutateProcessor<RegisterUserSchemaType, string>({
    url: "/auth/register",
    key: ["register"],
    method: "POST",
  });
  const { toast } = useToast();
  const onSubmit: SubmitHandler<RegisterUserSchemaType> = (values) => {
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
                          Birthdate
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="focus-visible:ring-0  focus-visible:ring-offset-0"
                            type="date"
                            placeholder={`Enter birthdate`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
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
                            type="text"
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
                              <SelectItem value="174">Brgy 174</SelectItem>
                              <SelectItem value="175">Brgy 175</SelectItem>
                              <SelectItem value="176">Brgy 176</SelectItem>
                              <SelectItem value="178">Brgy 178</SelectItem>
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
                  onClick={() => router.replace('/mediwise')}
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
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
