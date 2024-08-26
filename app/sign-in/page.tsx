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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
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
        <div className="flex justify-center items-center min-h-screen py-8 px-4">
            <div className="w-full max-w-md space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} className="py-2" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} className="py-2" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between items-center">
                            <Link className="text-sm text-blue-600 hover:underline" href="/forget-password">
                                Forgot password?
                            </Link>
                        </div>
                        <Button type="submit" className="w-full">Sign In</Button>
                    </form>
                </Form>
                <div className="text-center">
                    <Link href="/sign-up" className="text-sm text-blue-600 hover:underline">
                        Create a New Account
                    </Link>
                </div>
                <Separator />
                {/* You can uncomment and add your SignIn component here if needed */}
                {/* <div className="flex flex-col">
                    <SignIn />
                </div> */}
            </div>
        </div>
    )
}