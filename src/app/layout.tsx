import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import { ReduxProvider } from "@/redux/provider";
import { ReactFlowProvider } from "@xyflow/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "I Wanna be Yours",
  description:
    "I wanna be your vacuum cleaner, breathing in your dust, I wanna be your ford cortina, I will never rust, If you like your coffee hot, let me be your coffee pot, you cann the shots, babe, I wanna be yours, secrets I have held in my heart, are harder to hide than I thought, maybe I just wanna be yours, I wanna be yours, I wanna be yorus .....",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <ReduxProvider>
          <ReactFlowProvider>{children}</ReactFlowProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
