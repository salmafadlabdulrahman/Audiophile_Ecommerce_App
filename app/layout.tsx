import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Audiophile",
  description: "We offer the best tech gadgets for you and in the highest quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        {children}
      </body>
    </html>
  );
}
