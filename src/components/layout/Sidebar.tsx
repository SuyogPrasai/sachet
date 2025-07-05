import Link from "next/link";

import { Instagram, Youtube, Github, X } from 'lucide-react';


import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import AuthButton from "@/components/shared/AuthButton";
import Image from "next/image";

const navItems = [
  { title: "VISA Information", url: "https://edition.cnn.com/" },
  { title: "Competitions", url: "https://dofe.gov.np/" },
  { title: "Events", url: "https://bnks.edu.np/#/" },
  { title: "Nepal To USA", url: "https://bnks.edu.np/#/" },
  { title: "Nepal's Entrance Exams", url: "https://bnksmun.wixsite.com/home" },
];

const secondaryNavItems = [
  { title: "Hackathons", url: "https://lithub.com/" },
  { title: "Literature", url: "https://scitechdaily.com/" },
  { title: "Debating", url: "https://kathmandupost.com/" },
  { title: "Competitive Maths", url: "https://world.org/" },
  { title: "Story Tellings", url: "/articles?category=bnks" },
];
const finalNavItems = [
  { title: "About", url: "https://github.com/SuyogPrasai/parewa" },
  { title: "Documentation", url: "https://github.com/SuyogPrasai/parewa?tab=readme-ov-file#documentation" },
  { title: "Ways to Contribute", url: "#" },
  { title: "Report a bug", url: "https://forms.gle/e7LWQa73WBmnsiDS8" },
  { title: "Jobs", url: "https://forms.gle/cybYghNXgoumfKfP6" },
  { title: "Credits", url: "#" },
];

const socialIcons = [
  { Icon: Instagram, href: "instagram.com" },
  { Icon: Github, href: "github.com" },
  { Icon: Youtube, href: "https://www.youtube.com/@parewa_bnks" },
];

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas" className="">
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center justify-start mb-4">
            <SidebarTrigger sidebarVariant="opened">
              <X className="h-5 w-5 text-gray-500" />
            </SidebarTrigger>
            <div className="flex items-center justify-center">
              <Link href="/" className="text-2xl font-bold p-5 flex items-center justify-center gap-2">
                <Image src="/logo.png" alt="Parewa Logo" width={64} height={64} />
                Sachet
              </Link>
            </div>

          </div>
          <div className="mx-10">
            <SidebarMenu className="mb-4">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="font-serif text-xl">
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <Separator className="bg-black h-[0.0125rem]" />
            <div className="my-4 w-[75%]">

              <Link href="#">
                <button className="bg-primary text-white py-2 px-4 w-full flex items-center justify-center font-sans font-bold">
                  Submit 
                </button>
              </Link>
            </div>
            <Separator className="bg-black h-[0.0125rem]" />
            <div className="pt-4 mb-2">
              <SidebarMenu>
                {secondaryNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="font-serif text-xl">
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
            <AuthButton />
            <Separator className="mt-4 bg-black h-[0.0125rem]" />
            <div className="pt-4 mb-2">
              <SidebarMenu>
                {finalNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="font-mono text-md" target="_blank">
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>

            {/* Footer section */}
            <div className="mt-6 p-4 border-gray-200">
              <div className="flex items-center gap-4 mb-5">
                {/* Social Media Icons using Lucide React */}
                <a href="https://github.com/" aria-label="Facebook"><Github className="h-5 w-5 text-gray-500" /></a>
                <a href="https://www.instagram.com/" aria-label="Twitter"><Instagram className="h-5 w-5 text-gray-500" /></a>
                <a href="https://www.youtube.com/" aria-label="YouTube"><Youtube className="h-5 w-5 text-gray-500" /></a>

              </div>
              <div className="flex flex-col justify-center">

                <p className="text-xs text-gray-600 mb-3 ">© PAREWA</p>
                <p className="text-xs text-gray-600 mb-3">ALL RIGHTS RESERVED</p>
                <div className="flex space-x-4">
                  <a href="/terms_and_conditions.pdf" target="_blank" className="text-xs text-gray-500">TERMS OF USE</a>
                  <a href="/terms_and_conditions.pdf" target="_blank" className="text-xs text-gray-500">PRIVACY</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}