import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "THR Gateway | Portal Hadiah Lebaran",
  description:
    "Portal hadiah Lebaran dengan sistem putaran THR dan pencairan terjadwal.",
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
