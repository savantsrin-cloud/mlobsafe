import type { Metadata } from "next";
import { Kantumruy_Pro } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  variable: "--font-kantumruy",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ម្លប់សុវត្ថិភាព : Shade Safety | ទទួលស្គាល់សញ្ញា ការពារសុខភាពរបស់អ្នក",
  description: "គេហទំព័រដែលជួយកម្មករកាត់ដេរ អ្នករត់កង់បី/ម៉ូតូឌុប និងអ្នកលក់ដូរតាមផ្លូវនៅកម្ពុជា ឱ្យស្គាល់សញ្ញាជំងឺកម្ដៅ និងការពារខ្លួនក្នុងរដូវក្តៅខ្លាំង។ A website that helps Cambodian workers recognise heat illness signs and protect themselves.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km" className={kantumruy.variable}>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="bg-[#FAF9F5] text-gray-900 flex flex-col min-h-screen antialiased selection:bg-orange-100 selection:text-orange-800 font-sans">
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
