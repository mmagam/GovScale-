import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Strategic Assessment Tool",
  description: "Assess strategic capability with AI-powered insights and a radar chart."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
