"use client";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutateProcessor } from "@/hooks/useTanstackQuery";
import { handleImageDeleteOrReplace, uploadPhoto } from "@/lib/utils";
import { TUser } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Profile } from "@prisma/client";
import { UploadCloud } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type UserCardProps = {
  data: TUser & {profile:Profile};
};
const UserCard: React.FC<UserCardProps> = ({ data }) => {
  const formSchema = z.object({
    imageUrl: z.string().min(1),
  });
  type formSchemaType = z.infer<typeof formSchema>;
  const form = useForm<formSchemaType>({
    defaultValues: {
      imageUrl: "",
    },
    resolver: zodResolver(formSchema),
    mode: "all",
  });
  const onSubmit: SubmitHandler<formSchemaType> = (values) => {
    console.log(values)
  };

  // const updateProfile = useMutateProcessor<UpdateUserSchemaType, UserWithProfile>(
  //   `/users/${data?.id}`,
  //   null,
  //   "PATCH",
  //   ["users", data?.id],
  //   {
  //     enabled: typeof data?.id !== "undefined",
  //   }
  // );
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex bg-white dark:bg-[#1F2937] p-5 rounded-lg items-center gap-2"
      >

      <Avatar src={data?.image} />        

        <div className="flex flex-col ml-2 justify-between h-full">

            <div className="flex flex-col gap-y-1">
                <span className="text-md font-semibold text-zinc-600 dark:text-white">{data?.profile?.firstname} {data?.profile?.lastname}</span>
            </div>
        </div>
      </form>
    </Form>
  );
};

export default UserCard;
