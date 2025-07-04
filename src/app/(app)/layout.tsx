import { ReactNode } from "react";
import "@/app/globals.css";

import { Roboto, Lato, Oswald, Bebas_Neue } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from "@/components/layout/sidebar/Sidebar";
import AnnouncementCard from "@/components/layout/Announcement";

import { main_metadata } from "@/config/site-config";

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

interface RootLayoutProps {
  children: ReactNode;
}

const wordpress_ip = process.env.WORDPRESS_SITE_IP || "";

export default async function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="en">

      <body className={`${roboto.variable} ${lato.variable} ${oswald.variable} ${bebas_neue.variable}`}>
        <AuthProvider>
          {/* <Preloader> */}
          <SidebarProvider defaultOpen={false}>
            <AppSidebar wordpress_ip={wordpress_ip} />
            <SidebarInset>
              <AnnouncementCard />
              {/* Main content area */}
              <main className="">
                {children}
              </main>
              <Toaster />
            </SidebarInset>
          </SidebarProvider>
          {/* </Preloader> */}
        </AuthProvider>
      </body>
    </html>
  );
}