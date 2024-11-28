import Header from "@/components/Header"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getServerSession, Session } from "next-auth";
import {Inter} from "next/font/google";
import { authOptions } from "./api/auth/[...nextauth]/route";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FiskFinds",
  description: "A facebook marketplace for Fisk University students!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: Session | null = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header session = {session} />
        {children}
      </body>
    </html>
  );
}
