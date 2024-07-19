import { getProfile } from "@/data-access/profile"
import { getCurrentUser } from "@/lib/session"
import TopNav from "./topNav"
type Props = {
  username: string,
  userId: number,
  imageBase64: string
}

export async function ServerComponentTopNavBar() {
  const user = await getCurrentUser() as { username: string, id: number }
  console.log(user, "user")
  if (!user)
    return null
  // const {username, id} = user

  const profile = await getProfile(user.id)
  const { image } = profile

  // If children is a function, call it with the props


  // Otherwise, just render the children
  return <TopNav username={user?.username as string} userId={user.id} imageBase64={image || ''} />
}