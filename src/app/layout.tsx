import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vision Scroll Snap",
  description: "Vision images with CSS scroll snap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
