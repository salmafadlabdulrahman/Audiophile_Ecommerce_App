import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Audiophile",
  description:
    "We offer the best tech gadgets for you and in the highest quality.",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
  if (!clerkKey) {
    console.error("Clerk publishable key is missing.");
  }
  return (
    <ClerkProvider publishableKey={clerkKey}>
      <html lang="en">
        <body className={``}>
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
          
        </body>
      </html>
    </ClerkProvider>
  );
}
