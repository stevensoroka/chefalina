import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chefalina — Meal inspiration for the week",
  description:
    "Browse meals, build a weekly plan, and merge a shopping list — one cozy step at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
