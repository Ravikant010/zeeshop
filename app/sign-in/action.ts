// app/actions.ts
'use server'

import { signInUseCase } from "@/data-access/users"
import { setSession } from "@/lib/session"
import { redirect } from "next/navigation"

export async function signInAction(email: string, password: string) {
  const user = await signInUseCase(email, password)
  await setSession(user.id)
  redirect("/")
}