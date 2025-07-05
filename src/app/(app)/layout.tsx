import type { Metadata } from "next";
import "@/app/globals.css";
import { Roboto, Lato, Oswald, Bebas_Neue } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Toaster } from "@/components/ui/sonner";

import { main_metadata } from "@/config/site-config";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementCard from "@/components/layout/Announcement";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-roboto",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-oswald",
});

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas_neue",
});

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lato',
})


export const metadata = main_metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${lato.variable} ${oswald.variable} ${bebas_neue.variable} antialiased`}
      >
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <SidebarInset>
            <AnnouncementCard />
            {/* Main content area */}
            <Header />
            <main className="">
              {children}
            </main>
            <Footer />
            <Toaster />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
