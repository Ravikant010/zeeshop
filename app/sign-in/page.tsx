"use client";

import { signIn } from "next-auth/react";
import React from 'react';
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
import Image from "next/image";

type Props = {}

const formSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(255, { message: "Password must not exceed 255 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
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
    await signInAction(values.email, values.password);
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"}}>
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1613909671501-f9678ffc1d33?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Zeeshop</h1>
            <p className="text-xl">Discover the latest trends in fashion</p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Image src="/logo.png" alt="Zeeshop Logo" width={200} height={100} className="mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
                create a new account
              </Link>
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700">Email address</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
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
                    <FormLabel className="block text-sm font-medium text-gray-700">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link href="/forget-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <Button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign In
              </Button>
            </form>
          </Form>
          <Separator />
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <Button variant="outline" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </Button>
              </div>
              <div>
                <Button variant="outline" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Sign in with Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

