import { createAccount } from "@/data-access/account";
import { createProfile, getProfile } from "@/data-access/profile";
import { createUser, deleteUser, getUserByEmail, verifyPassword } from "@/data-access/users";
import { createVerifyEmailToken } from "@/data-access/verify-email";
import { VerifyEmail } from "@/email/verify-email";
import { applicationName } from "@/lib/app-config";
import { sendEmail } from "@/lib/email";
import { UserId, UserSession } from "@/use-cases/types";
import { GoogleUser } from "@/app/api/login/google/callback/route";

import { AuthenticationError, LoginError, NotFoundError } from "./errors";
export async function deleteUserUseCase(
    authenticatedUser: UserSession,
    userToDeleteId: UserId
  ): Promise<void> {
    if (authenticatedUser.id !== userToDeleteId) {
      throw new AuthenticationError();
    }
  
    await deleteUser(userToDeleteId);
  }

  export async function getUserProfileUseCase(userId: UserId) {
    const profile = await getProfile(userId);
  
    if (!profile) {
      throw new NotFoundError();
    }
  
    return profile;
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

  export async function createGoogleUserUseCase(googleUser: GoogleUser) {
    let existingUser = await getUserByEmail(googleUser.email);
  
    if (!existingUser) {
      existingUser = await createUser(googleUser.email, "", "")
    }
  
    // await createAccountViaGoogle(existingUser.id, googleUser.sub);
  
    await createProfile(existingUser.id, googleUser.name, googleUser.picture);
  
    return existingUser.id;
  }

export async function registerUserUseCase({ email, username, dob, password , image}: { email: string, password: string, username: string, dob: string , image:string}) {
	const existingUser = await getUserByEmail(email);
	if (existingUser) {
		throw  Error("email exist")
	}
	const user = await createUser(email, username, dob);
	console.log("user = ", user)
	await createAccount(user.id, password);
	await createProfile(user.id, username, image);

	const token = await createVerifyEmailToken(user.id);
    await sendEmail(
        email,
        `Verify your email for ${applicationName}`,
        <VerifyEmail token={token} />
      );
	return { id: user.id };
}