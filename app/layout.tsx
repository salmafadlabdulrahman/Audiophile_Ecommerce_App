import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import UserProvider from "./context/UserContext";
import CartProvider from "./context/CartContext";

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
    <UserProvider>
      <CartProvider>
        <html lang="en">
          <body>
            <header>
              <Navbar />
            </header>
            <main>{children}</main>
          </body>
        </html>
      </CartProvider>
    </UserProvider>
  );
}
