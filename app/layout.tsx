import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pit Stop Python",
  description:
    "Game balap kuis Python. Jawab benar, salip mobil AI, finis duluan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
