import { db } from "@/db/schema";
import { sessions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteSessionForUser(userId: number) {
  await db.delete(sessions).where(eq(sessions.userId, userId));
}
