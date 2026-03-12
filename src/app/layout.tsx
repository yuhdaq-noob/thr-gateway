import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "THR Gateway | Portal Hadiah Lebaran",
  description:
    "Portal THR dan pencairan terjadwal.",
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
