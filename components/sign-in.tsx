
import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
 
export function SignIn() {
  return (
    <form
      action={async () => {
  
        await signIn("google", {redirectTo: "/"})
      }}
    >
      <Button type="submit" className="h-10 w-full">Signin with Google</Button>
    </form>
  )
} 