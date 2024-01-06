"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import {
  useMutateProcessor,
  useQueryProcessor,
} from "@/hooks/useTanstackQuery";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { SetupAccountSchema, TSetupAccountSchema } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Barangay } from "@prisma/client";
import { Loader2 } from "@/components/ui/Loader";

type SetupClientProps = {
  currentUser: Session["user"];
};
const SetupClient: React.FC<SetupClientProps> = ({ currentUser }) => {
  const { toast } = useToast();
  const router = useRouter();

  const barangay = useQueryProcessor<Barangay[]>({
    url: "/barangay",
    key: ["barangay"],
  });


  const setup = useMutateProcessor<TSetupAccountSchema, unknown>({
    url: `/auth/setup`,
    key: ['setup-account'],
    method: 'POST'
  })
  const form = useForm<TSetupAccountSchema>({
    mode: "all",
    defaultValues: {
      barangayId: '',
      confirmPassword: '',
      password: ''
    },
    resolver: zodResolver(SetupAccountSchema),
  });

  const onSubmit: SubmitHandler<TSetupAccountSchema> = async (values) => {
    setup.mutate(values, {
      onError(error, variables, context) {
          console.error(error)
          toast({
            title: 'Set up failed',
            variant:'destructive'
          })
      },
      onSuccess(data, variables, context) {
          console.log(data)
          toast({
              title: 'Set up successful',
          })
          router.refresh()
      },
  })
  };

  const isLoading = form.formState.isSubmitting || setup.status === 'pending'
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img
          className="w-[150px] h-[70px] mr-2 object-cover"
          src="/images/mediwiseLogo.png"
          alt="logo"
        />
        <div className="w-full flex flex-col gap-y-3 p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 ">
          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Setup account
          </h1>
          <p className="font-light text-gray-500 dark:text-gray-400">
            Set up your barangay location and password
          </p>
          <Form {...form}>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5 flex flex-col"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div>
                <FormField
                  control={form.control}
                  name="barangayId"
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
                            <SelectTrigger className="focus-visible:ring-0  focus-visible:ring-offset-0" disabled={isLoading}>
                              <SelectValue placeholder="Select a barangay" />
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
                          disabled={isLoading}
                          placeholder={`Enter password`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                        Confirm password
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="focus-visible:ring-0  focus-visible:ring-offset-0"
                          type="password"
                          disabled={isLoading}
                          placeholder={`Enter password confirmation`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="self-end" disabled={isLoading}>
              {(() => {
                if(isLoading) {
                  return <div className="flex items-center"> <Loader2  size={20}/> Saving </div>
                }
                return 'Finish setup'
              })()}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SetupClient;
