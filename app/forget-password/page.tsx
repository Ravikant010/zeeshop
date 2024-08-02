
"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { rateLimitByIp } from "@/lib/limiter";
import { resetPasswordUseCase } from "@/use-cases/users";

// Define the schema for form validation
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // console.log(values);
    await  rateLimitByIp({ key: values.email, limit: 1, window: 30000})
    await resetPasswordUseCase(values.email)
    setTimeout(() => setIsLoading(false), 3000); // Simulating API call
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px] bg-white ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">Forgot Password</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        className="border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-white text-black hover:bg-gray-800 hover:text-white"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}