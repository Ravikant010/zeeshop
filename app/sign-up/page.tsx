"use client";
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
// Ensure this path is correct
const formSchema = z.object({
    dob: z.
        date({
            required_error: "A date of birth is required.",
        }),
    email: z
        .string()
        .email({ message: "Write a valid email address" }),
    password: z
        .string()
        .min(8, { message: "Password length should be minimum of 8 characters long" })
        .max(255, { message: "Password length should be maximum of 255 characters long" }),
    username: z
        .string()
        .min(5)
        .max(255),
});
export default function Page() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            dob: new Date(),
        },
    });
    const [profile, setProfile] = useState(false);
    function onSubmit(values: z.infer<typeof formSchema>) {
        setProfile(true);
        console.log("Form Submitted");
        console.log(values);
    }
    const setDate = (date: Date) => {
        form.setValue('dob', date);
    };
    const userProfileRef = React.useRef<HTMLInputElement | null>(null)
    function InvokeImageINput() {
        if (userProfileRef.current) {
            userProfileRef.current.click()
        }
    }
    const [userProfileAsFile, setUserProfileAsFile] = useState<File | null>(null)
    const [userProfile, setUserProfile] = useState<{ name: string, base64: string }[] | null>(null);
    function userImageInputOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setUserProfileAsFile(event.target.files[0])
            const filesWithBase64: { name: string, base64: string }[] = [];
            filesArray.forEach(file => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    filesWithBase64.push({ name: file.name, base64: reader.result as string });
                    if (filesWithBase64.length === filesArray.length) {
                        setUserProfile(filesWithBase64);
                        console.log(filesWithBase64);
                    }
                };
            });
        }
    }
    React.useEffect(() => {
        console.log(userProfile)
    }, [userProfile])
    if (profile)
        return <div className="flex justify-center items-center flex-col h-screen ">
            <div className="flex flex-col w-fit space-y-4 ">
                <div className=" p-2  rounded-2xl border-red-600 min-w-[300px] h-auto flex justify-start items-center w-auto ">
                    <div className="w-20 h-20 rounded-full border border-black mr-4 flex justify-center items-center cursor-default" onClick={InvokeImageINput}>
                        {userProfile ? <img src={userProfile[0].base64} className="h-full w-full rounded-full object-cover" /> :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#9b9b9b"} fill={"none"}>
                                <path d="M7 6.00049C5.77936 6.00415 5.10383 6.03335 4.54873 6.26634C3.7712 6.59269 3.13801 7.19552 2.76811 7.96158C2.46618 8.58687 2.41677 9.38799 2.31796 10.9902L2.16312 13.5009C1.91739 17.4853 1.79452 19.4775 2.96369 20.7388C4.13285 22 6.10252 22 10.0419 22H13.9581C17.8975 22 19.8672 22 21.0363 20.7388C22.2055 19.4775 22.0826 17.4853 21.8369 13.5009L21.682 10.9902C21.5832 9.38799 21.5338 8.58687 21.2319 7.96158C20.862 7.19552 20.2288 6.59269 19.4513 6.26634C18.8962 6.03335 18.2206 6.00415 17 6.00049" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M17 7L16.1142 4.78543C15.732 3.82996 15.3994 2.7461 14.4166 2.25955C13.8924 2 13.2616 2 12 2C10.7384 2 10.1076 2 9.58335 2.25955C8.6006 2.7461 8.26801 3.82996 7.88583 4.78543L7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15.5 14C15.5 15.933 13.933 17.5 12 17.5C10.067 17.5 8.5 15.933 8.5 14C8.5 12.067 10.067 10.5 12 10.5C13.933 10.5 15.5 12.067 15.5 14Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M11.9998 6H12.0088" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                    </div>
                    {!userProfile ? "upload profile picture" : form.getValues('username')}
                </div>
                <div className="w-full flex justify-between items-center flex-col space-y-4">
                    {!userProfile ? <Button className="w-full" >Skip</Button> :
                        <Button className="w-full h-10" >Submit</Button>
                    }
                </div>
            </div>
            <Input type="file" accept="image" className="hidden" ref={userProfileRef} onChange={userImageInputOnChange} />
        </div>
    return (
        <div className="flex justify-center items-center h-screen flex-col space-y-4 text-start">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="w-[400px]">
                                <FormLabel className="">Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" {...field} className="py-4" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-[400px]">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} className="py-4" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        <label className="text-[14px]">DOB</label>
                        <DatePickerDemo setDate={setDate} />
                    </div>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-[400px]">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" {...field} className="py-4" type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full h-10 py-4">Submit</Button>
                </form>
            </Form>
            {/* <Link href="/sign-in" className="mt-4">Create A New Account</Link> */}
        </div>
    );
}
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerDemo({ setDate }: {
    setDate: (date: Date) => void
}) {
    const [date, setDate_] = React.useState<Date>();
    React.useEffect(() => {
        if (date) setDate(date);
    }, [date]);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal h-10 py-4",
                        !date && "text-muted-foreground py-4 h-10"
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
                    onSelect={setDate_}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}


// import { auth, signIn } from "@/auth"
// import { redirect } from "next/navigation"
// import { signup } from "./action"

// export default async function SignIn() {


//   return (
//     <form
//       action={signup}>
//       <label htmlFor="username">Username</label>
// 				<input name="username" id="username" />
// 				<br />
// 				<label htmlFor="password">Password</label>
// 				<input type="password" name="password" id="password" />
// 				<br />
// 				<button>Continue</button>
    
//     </form>
//   )
// }



// interface ActionResult {
// 	error: string;
// }