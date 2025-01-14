import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import UserProvider from "./context/UserContext";

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
  return (
    <UserProvider>
      <html lang="en">
        <body className={``}>
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
        </body>
      </html>
    </UserProvider>
  );
}
