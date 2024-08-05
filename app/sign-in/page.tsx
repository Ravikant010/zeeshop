"use client";
import { signIn } from "next-auth/react"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SignIn } from "@/components/sign-in";
import { signInAction } from "./action";
type Props = {}
const formSchema = z.object({
    password: z
        .string()
        .min(8, { message: "Password length should be minimum of 8 characters long" })
        .max(255, { message: "Password length should be maximum of 255 characters long" }),
    email: z
        .string()
        .min(5)
        .max(255),
});
export default function Page({ }: Props) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        await signInAction(values.email, values.password)
    }
    return (
        <div className="flex justify-center items-center h-screen flex-col space-y-4 text-start">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-[400px]">
                                <FormLabel className="">email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} className="py-4" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-[400px] ">
                                <FormLabel className="">password</FormLabel>
                                <FormControl>
                                    <Input placeholder="password" {...field} className="py-4" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Link className="capitalize   " href= "/forget-password">forget password</Link>
                    <Button type="submit" className="w-full h-10">Submit</Button>
                </form>
            </Form>
            <Link href="/sign-up" className="capitalize">Create a New Account</Link>
            <Separator className="w-[400px]" />
            {/* <div className="flex flex-col w-[400px]">
                <SignIn />
            </div> */}
        </div>
    )
}
