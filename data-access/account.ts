import { accounts, db, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
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
    console.log("password", password)
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
export async function updatePassword(userId: number, password: string, trx = db) {
    const salt = crypto.randomBytes(128).toString('base64');
    const hash = await hashPassword(password, salt);
    await trx.update(accounts).set({
        password: hash,
        salt
    }).where(and(eq(accounts.userId, userId), eq(accounts.accountType, "email")))
}
export async function getAccountByGoogleId(googleId: string) {
    const user_by_google = await db.select().from(accounts).where(eq(accounts.googleId, googleId))
    return user_by_google[0] || null
}
export async function getAccountByUserId(userId: number) {
    const account = await db.select().from(accounts).where(eq(accounts.userId, userId))
    return account[0] || null
}