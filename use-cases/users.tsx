"use server"
import { createAccount, updatePassword } from "@/data-access/account";
import { createProfile, getProfile } from "@/data-access/profile";
import { createUser, deleteUser, getUserByEmail, verifyPassword } from "@/data-access/users";
import { createVerifyEmailToken } from "@/data-access/verify-email";
import { VerifyEmail } from "@/email/verify-email";
import { applicationName } from "@/lib/app-config";
import { sendEmail } from "@/lib/email";
import { UserId, UserSession } from "@/use-cases/types";
import { GoogleUser } from "@/app/api/login/google/callback/route";

import { AuthenticationError, LoginError, NotFoundError } from "./errors";
import { ResetPasswordEmail } from "@/email/resetEmail";
import { createPasswordResetToken, deletePasswordResetToken, getPasswordResetToken } from "@/data-access/reset-token";
import { createTransaction } from "./utils";
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


export async function resetPasswordUseCase(email: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new AuthenticationError();
  }

  const token = await createPasswordResetToken(user.id);

  await sendEmail(
      email,
      `Your password reset link for ${applicationName}`,
      <ResetPasswordEmail token={token} />
    );
}

export async function changePasswordUseCase(token: string, password: string): Promise<number> {
  const tokenEntry = await getPasswordResetToken(token);
  
  if (!tokenEntry) {
    throw new AuthenticationError();
  }

  const userId = tokenEntry.userId;

  try {
    await createTransaction(async (trx) => {
      await deletePasswordResetToken(token, trx);
      await updatePassword(userId, password, trx);
    });

    return userId;
  } catch (error) {
    console.error('Error changing password:', error);
    throw new Error('Failed to change password');
  }
}