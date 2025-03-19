"use client"
import React, { useState, useRef } from 'react';
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
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { signUpAction } from './action';
import { afterLoginUrl } from "@/lib/app-config";

const formSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must not exceed 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string()
    .email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
  dob: z.string()
    .refine((dob) => {
      const date = new Date(dob);
      return !isNaN(date.getTime());
    }, "Invalid date format")
});

export default function SignupPage() {
  const router = useRouter();
  const [showProfileUpload, setShowProfileUpload] = useState(false);
  const [userProfile, setUserProfile] = useState<{ name: string, base64: string }[] | null>(null);
  const userProfileRef = useRef<HTMLInputElement | null>(null);
  const [date, setDate] = useState<Date>(new Date());

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      dob: "",
    },
  });

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      console.log("Selected Date:", selectedDate);
      setDate(selectedDate); // Update the state with the selected date
    } else {
      console.log("No date selected");
    }
  };

  function invokeImageInput() {
    if (userProfileRef.current) {
      userProfileRef.current.click();
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const filesWithBase64: { name: string, base64: string }[] = [];
      
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          filesWithBase64.push({ name: file.name, base64: reader.result as string });
          if (filesWithBase64.length === filesArray.length) {
            setUserProfile(filesWithBase64);
          }
        };
      });
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!showProfileUpload) {
      setShowProfileUpload(true);
      return;
    }

    try {
      if (!userProfile?.[0]?.base64) {
        throw new Error('Please upload a profile image');
      }
      
      const user_id = await signUpAction({
        ...values,
        image: userProfile[0].base64
      });
      
      if (user_id) {
        router.push(afterLoginUrl);
      }
    } catch (error) {
      console.error('Signup error:', error);
      form.setError('root', { message: 'An unexpected error occurred' });
    }
  }

  if (showProfileUpload) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Complete Your Profile</h2>
            <p className="mt-2 text-gray-600">Add a profile picture to continue</p>
          </div>
          
          <div className="flex flex-col items-center space-y-6">
            <div 
              onClick={invokeImageInput}
              className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors"
            >
              {userProfile ? (
                <img 
                  src={userProfile[0].base64} 
                  className="h-full w-full rounded-full object-cover"
                  alt="Profile preview" 
                />
              ) : (
                <div className="text-gray-400">
                  <CalendarIcon className="w-12 h-12" />
                  <span className="text-sm mt-2">Upload Photo</span>
                </div>
              )}
            </div>
            
            <div className="w-full space-y-4">
              <Button 
                onClick={() => onSubmit(form.getValues())}
                className="w-full"
              >
                Complete Signup
              </Button>
              <Button 
                variant="outline"
                onClick={() => onSubmit(form.getValues())}
                className="w-full"
              >
                Skip for now
              </Button>
            </div>
          </div>
          
          <Input 
            type="file" 
            accept="image/*"
            className="hidden"
            ref={userProfileRef}
            onChange={handleImageChange}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1613909671501-f9678ffc1d33?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-5xl font-bold mb-4">Join Zeeshop</h1>
            <p className="text-xl">Create an account to start shopping</p>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Image src="/logo.png" alt="Zeeshop Logo" width={200} height={100} className="mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input {...field} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md" />
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
                      <Input 
                        type="password" 
                        {...field} 
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateSelect}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                Continue
              </Button>
              
              {form.formState.errors.root && (
                <p className="text-red-500 text-sm mt-2">{form.formState.errors.root.message}</p>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}