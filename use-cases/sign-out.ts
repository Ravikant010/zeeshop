"use server"
import {lucia} from "@/lib/auth"
import { validateRequest } from "@/lib/validate_lucia_user"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function SignOutAction() {
    const {session} = await validateRequest()
    if(!session)
        return redirect("/sign-in")
    await lucia.invalidateSession(session.id)
    const sessionCookie  = lucia.createBlankSessionCookie()
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )
  redirect("/sign-in")  
}