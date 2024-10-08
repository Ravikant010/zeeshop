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
  let image; 
  // const {username, id} = user
if(user){
  const profile = await getProfile(user.id)
  image = profile.image
}
  // If children is a function, call it with the props


  // Otherwise, just render the children
  return <TopNav username={user?.username as string} userId={user?.id} imageBase64={image || ''} />
}