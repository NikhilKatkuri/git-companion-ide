import type { Metadata } from "next"; 
import "./globals.css"; 

 
 
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
        {children}
      </body>
    </html>
  );
}
