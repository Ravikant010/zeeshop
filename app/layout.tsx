import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/topNav";
import {SessionProvider} from "@/lib/lucia_session_provider"
import {validateRequest} from "@/lib/validate_lucia_user"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "zeeshop",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest() 
  return (
    <html lang="en">
      <body className={inter.className}>
      <TopNav />
      <SessionProvider value={session}>
        {children}
        </SessionProvider></body>
    </html>
  );
}
