import { Providers } from "@/components";
import { geistMono, geistSans } from "@/config/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Things Shop",
    default: "Things Shop",
  },
  description: "Minimalist shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geistSans.className} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
