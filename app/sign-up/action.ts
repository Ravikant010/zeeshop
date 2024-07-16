// import { lucia } from "@/lib/auth";
// import { cookies } from "next/headers";
// import { generateId } from "lucia";
// import { hash } from "@node-rs/argon2";
// import { db, users } from "@/db/schema";
// import { PostgresError } from "postgres";
// import { redirect } from "next/navigation";
// function isValidEmail(email: string) {
// 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 	return emailRegex.test(email);
// }
// export async function signup(formData: FormData): Promise<ActionResult> {
// 	"use server";
// 	const username = formData.get("username") as string;
// 	const email = formData.get('email') as string
// 	const dob = formData.get('dob') as string
// 	const password = formData.get("password");
// 	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
// 	// keep in mind some database (e.g. mysql) are case insensitive
// 	if (
// 		typeof username !== "string" ||
// 		username.length < 3 ||
// 		username.length > 31 ||
// 		!/^[a-z0-9_-]+$/.test(username)
// 	) {
// 		return {
// 			error: "Invalid username"
// 		};
// 	}
// 	if (!isValidEmail(email)) {
// 		return {
// 			error: "Invalid email address."
// 		};
// 	}
// 	const dobDate = new Date(dob);
// 	if (isNaN(dobDate.getTime()) || dobDate > new Date()) {
// 		return {
// 			error: "Invalid date of birth. Must be a valid date not in the future."
// 		};
// 	}
// 	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
// 		return {
// 			error: "Invalid password"
// 		};
// 	}
// 	const passwordHash = await hash(password, {
// 		// recommended minimum parameters
// 		memoryCost: 19456,
// 		timeCost: 2,
// 		outputLen: 32,
// 		parallelism: 1
// 	});
// 	const userId = generateId(15);
// 	try {
// 		await db.insert(users).values({
// 			username,
// 			email,
// 			dob
// 		});
// 		const session = await lucia.createSession(userId, {});
// 		const sessionCookie = lucia.createSessionCookie(session.id);
// 		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
// 	} catch (e) {
// 		if (e instanceof PostgresError && e.code === '23505') {
// 			return {
// 				error: "Username already used"
// 			};
// 		}
// 		return {
// 			error: "An unknown error occurred"
// 		};
// 	}
// 	return redirect("/");
// }
// export interface ActionResult {
// 	error: string | null;
// }



"use server"
import { createAccount } from '@/data-access/account';
import { createProfile } from '@/data-access/profile';
import { createUser, getUserByEmail } from '@/data-access/users';
import { createVerifyEmailToken } from '@/data-access/verify-email';
import { applicationName } from '@/lib/app-config';
import { sendEmail } from '@/lib/email';
import { generateRandomName } from '@/lib/names';
import {VerifyEmail} from "@/email/verify-email"
// import { EmailInUseError } from '@/use-cases/errors';
// import { createServerActionProcedure } from "zsa";
import { z } from 'zod';
import { registerUserUseCase } from '@/use-cases/users';






export async function signUpAction({ email, username, dob, password, image }: { email: string, password: string, username: string, dob: string , image:string}) {
	try {
		// Validate input


		// Call registerUserUseCase wBecomeHacker2025@ith email and password
		const user = await registerUserUseCase({ email, username, dob, password, image });

		// You might want to do something with the username and dob here,
		// like updating the user's profile

		return { success: true, data: { userId: user.id } };
	} catch (error) {
		//   if (error instanceof z.ZodError) {
		// 	return { success: false, errors: error.errors };
		//   }
		//   if (error instanceof EmailInUseError) {
		// 	return { success: false, error: 'Email is already in use' };
		//   }
		console.error('Unexpected error during sign up:', error);
		return { success: false, error: 'An unexpected error occurred' };
	}
}

// Your onSubmit function
