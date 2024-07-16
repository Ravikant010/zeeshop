import { db, Profile, profiles } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function createProfile(userId:number, displayName: string, image?: string) {
    const [profile] = await db.insert(profiles).values({
userId,
image,
displayName
    })
    .onConflictDoNothing()
    .returning();
    return profile
}

export async function updateProfile(
    userId: number,
    updateProfile: Partial<Profile>
  ) {
    await db
      .update(profiles)
      .set(updateProfile)
      .where(eq(profiles.userId, userId));
  }
  
  export async function getProfile(userId: number) {
    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId))
    return profile;
  }
  