import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medi-Connect AI",
  description: "Smart Healthcare & Appointment Platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
