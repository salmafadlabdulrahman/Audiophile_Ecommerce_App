import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Audiophile",
  description:
    "We offer the best tech gadgets for you and in the highest quality.",
};

interface PageProps {
  // Define your props here
  title?: string;
  meta?: {
    description: string;
    keywords: string[];
  };
  // Add other properties as needed
}

export default function RootLayout({
  children,
  pageProps
}: Readonly<{
  children: React.ReactNode;
  pageProps: PageProps
}>) {
  return (
    <ClerkProvider {...pageProps} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ""}>
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
