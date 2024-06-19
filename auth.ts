import NextAuth from "next-auth"
import google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db/schema"
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db) ,   
    providers: [google],
})