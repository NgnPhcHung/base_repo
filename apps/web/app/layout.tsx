import { AppProvider, ReactQueryProvider } from "@/providers";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PoSec",
  description: "from P.H w/ love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AppProvider>
          <MantineProvider defaultColorScheme="light">
            {children}
          </MantineProvider>
        </AppProvider>
      </body>
    </html>
  );
}
