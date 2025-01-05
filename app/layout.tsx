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
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
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
