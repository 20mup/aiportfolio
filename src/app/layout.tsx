import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Load Inter font for non-Apple devices
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mousa Pirzada — AI & Robotics Portfolio",
  description:
    "Interactive portfolio showcasing AIVA, NoteBuddy, and the Jurassic Rescue Robot — voice-AI, embedded systems, and robotics.",
  keywords: [
    "Mousa Pirzada",
    "Portfolio",
    "AI",
    "Robotics",
    "Embedded Systems",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Mousa Pirzada", url: "https://github.com/20mup" }],
  creator: "Mousa Pirzada",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://<your-vercel-domain>", // update after deploy
    title: "Mousa Pirzada — AI & Robotics Portfolio",
    description:
      "I build voice-AI and robotics that matter. AIVA, NoteBuddy, Autonomous Pet Feeder, Jurassic Rescue Robot.",
    siteName: "Mousa Pirzada — Portfolio",
    // images: ["/og.png"], // optional: add later
  },
  twitter: {
    card: "summary_large_image",
    title: "Mousa Pirzada — AI & Robotics Portfolio",
    description:
      "I build voice-AI and robotics that matter. AIVA, NoteBuddy, Autonomous Pet Feeder, Jurassic Rescue Robot.",
    creator: "@mousa", // or your handle
  },
  icons: {
    icon: [{ url: "/MP-logo-blackwhite.png", sizes: "any" }],
    shortcut: "MP-logo-blackwhite.png",
    apple: "MP-logo-blackwhite.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}