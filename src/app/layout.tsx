import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";


const roboto = Roboto({
  variable : "--font-roboto",
  subsets : ['latin']
})

export const metadata: Metadata = {
  title: "TFM - TUC Financy Manager",
  description: "TUC Financy Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}
