import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/store/provider";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Watchify - AI-Powered Movie Recommendations",
  description: "Discover your next favorite movie with AI-powered recommendations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-900">
            <Header />
            <main className="pt-20">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}