"use server"
import { db } from "@/db/schema";
import { User, accounts, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto"
import { getAccountByUserId } from "./account";
import { UserId } from "@/use-cases/types";
import { AuthenticationError, LoginError } from "./errors";
import { createPasswordResetToken } from "./reset-token";
import { sendEmail } from "@/lib/email";
import { env } from "@/env";
import {ResetPasswordEmail} from "@/email/resetEmail"
import { applicationName } from "@/lib/app-config";
const ITERATIONS = 10000
const MAGIC_LINK_TOKEN_TTL = 1000 * 60 * 5
export async function deleteUser(userId: UserId) {
    await db.delete(users).where(eq(users.id, userId));
}
export async function getUser(userId: UserId) {
    const user = await db.select().from(users).where(eq(users.id, userId)).execute();
    return user[0] || null;
}
export async function hashPassword(plainTextPassword: string, salt: string) {
    return new Promise<string>((resolve, reject) => {
        crypto.pbkdf2(
            plainTextPassword,
            salt,
            ITERATIONS,
            64,
            "sha512",
            (err, derivedKey) => {
                if (err)
                    reject(err)
                resolve(derivedKey.toString('hex'))
            }
        )
    })
}
export async function createUser(email: string, username: string, dob:string) {
    const [user] = await db.insert(users).values({
        username,
        email,
        dob
    }).returning()
    return user;
}
export async function createMagicUser(email: string) {
    const [user] = await db.insert(users).values({
        email,
        emailVerified: new Date()
    }).returning();
    await db.insert(accounts).values({
        userId: user.id,
        accountType: "email"
    }).returning()
    return user;
}


export async function verifyPassword(email: string, plainTextPassword: string) {
    const user = await getUserByEmail(email);
    if (!user)
        return false;
    const account = await getAccountByUserId(user.id);
    if (!account)
        return false
    const salt = account.salt;
    const saved_password = account.password;
    if (!salt || !saved_password) {
        return false
    }
    const hash = await hashPassword(plainTextPassword, salt)
    return account.password == hash
}

export async function getUserByEmail(email:string){
const user = await db.select().from(users).where(eq(users.email, email))
return user[0] || null
}

export async function getMagicUserAccountsByEmail(email:string) {
    const user = await db.select().from(users).where(eq(users.email, email))
    return user[0] || null
}

export async function setEmailVerified(userId: number) {
    await db.update(users).set({
        emailVerified: new Date()
    }).where(eq(users.id, userId ))
}

export async function updateUser(userId:number, updateUser:Partial<User>) {
 await db.update(users).set(updateUser).where(eq(users.id, userId))   
}

export async function signInUseCase(email: string, password: string) {
    const user = await getUserByEmail(email);
  
    if (!user) {
      throw new LoginError();
    }
  
    const isPasswordCorrect = await verifyPassword(email, password);

    if (!isPasswordCorrect) {
      throw new LoginError();
    }
  
    return { id: user.id };
}


