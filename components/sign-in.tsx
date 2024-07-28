
import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import { signInUseCase } from "@/data-access/users"
import { setSession } from "@/lib/session"
import { redirect } from "next/navigation"
 
export  function SignIn() {
  return (
    <form>
      <Button type="submit" className="h-10 w-full">Signin with Google</Button>
    </form>
  )
} 