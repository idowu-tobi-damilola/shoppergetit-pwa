

import { Comfortaa } from "next/font/google";
import ServiceWorkerProvider from "@/components/ServiceWorkerProvider"; // Import the new component
import "./globals.css";

const comfortaa = Comfortaa({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body  suppressHydrationWarning className={`${comfortaa.variable} antialiased`}>
        <ServiceWorkerProvider /> {/* Call the service worker here */}
        {children}
      </body>
    </html>
  );
}
