import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { generateId } from "lucia";
import { hash } from "@node-rs/argon2";
import { db, userTable } from "@/db/schema";
import { PostgresError } from "postgres";
import { redirect } from "next/navigation";
export async function signup(formData: FormData): Promise<ActionResult> {
	"use server";
	const username = formData.get("username");
	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
	// keep in mind some database (e.g. mysql) are case insensitive
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username"
		};
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return {
			error: "Invalid password"
		};
	}

	const passwordHash = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
	const userId = generateId(15);

	try {
        await db.insert(userTable).values({
            id: userId,
            username: username,
            password_hash: passwordHash,
          });

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	} catch (e) {
		if (e instanceof PostgresError && e.code === '23505') {
            return {
              error: "Username already used"
            };
          }
          return {
            error: "An unknown error occurred"
          };
	}
	return redirect("/");
}

export interface ActionResult {
	error: string | null;
}