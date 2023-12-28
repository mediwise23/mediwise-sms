"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const form = useForm();
  return (
    <div className="bg-white shadow-md w-[50%] h-[50%] flex items-center">
      <section className="flex flex-[0.5] h-full w-full">
        <img
          src="/images/BGPNU.jpeg"
          alt=""
          className="w-full h-full object-cover "
        />
      </section>
      <Form {...form}>
        <form className="flex flex-col">
          <h1>Create a free account</h1>


          <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="">
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
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
