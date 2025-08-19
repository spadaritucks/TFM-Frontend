import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'
import { ModalProvider } from "@/context/modal";
import Modal from "@/components/modal/compontent";


const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ['latin']
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
        <ModalProvider>
          {children}
          <Modal/>
          <Toaster />
        </ModalProvider>
      </body>
    </html>
  );
}
