import { accounts, db, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto"
const ITERATIONS = 10000;
async function hashPassword(plainTextPassword: string, salt: string) {
    return new Promise<string>((resolve, reject) => {
        crypto.pbkdf2(
            plainTextPassword,
            salt,
            ITERATIONS,
            64,
            "sha512",
            (err, derivedKey) => {
                if (err) reject(err);
                resolve(derivedKey.toString("hex"));
            }
        );
    });
}
export async function createAccount(userId: number, password: string) {
    const salt = crypto.randomBytes(128).toString()
    const hash = await hashPassword(password, salt)
    const [account] = await db.insert(accounts).values({
        userId,
        accountType: "email",
        password: hash,
        salt
    })
    return account
}
export async function createAccountByGoogle(userId: number, googleId: string) {
    await db.insert(accounts).values({
        userId: userId,
        accountType: "google",
        googleId
    })
}


export async function getAccountByUserId(userId: number) {
    const account = await db.select().from(accounts).where(eq(accounts.userId, userId))
    return account[0] || null
}