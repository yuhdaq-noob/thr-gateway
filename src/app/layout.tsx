import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "THR Gateway",
  description: "Gateway permainan spin THR berbasis Next.js dan Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
