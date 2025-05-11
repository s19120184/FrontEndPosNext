import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const outfit = Outfit({subsets:['latin']})

//hola
export const metadata: Metadata = {
  title: "POS - Next App",
  description: "POS - Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.className} bg-gray-200`}
      >
        {/* para utilizar tanstack-query */}
        <Providers>{children}</Providers>
        
      </body>
    </html>
  );
}
