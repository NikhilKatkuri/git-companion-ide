import type { Metadata } from "next"; 
import "./globals.css"; 
import { ThemeContextProvider } from "@/context/themeContext";

 
 
export const metadata: Metadata = {
title: 'Git-Companion IDE',
  description: 'Lightweight GitHub + AI Companion IDE by Nikhil Katkuri',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <ThemeContextProvider>

        {children}
        </ThemeContextProvider>
      </body>
    </html>
  );
}
