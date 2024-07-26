import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "@/auth"  // Adjust the import path as needed
import { getCurrentUser } from './lib/session'

export async function middleware(request: NextRequest) {
  const user = getCurrentUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [  '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)']
}