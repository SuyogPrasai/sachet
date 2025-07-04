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
  { title: "GENERAL NEWS", url: "/notices?category=General" },
  { title: "DEPARTMENT'S MESSAGE", url: "/notices?category=Departments" },
  { title: "SCHOOL ADMINISTRATION", url: "/notices?category=School" },
  { title: "THE STUDENT COUNCIL", url: "/notices?category=Council" },
  { title: "CLUBS AND EVENTS", url: "/notices?category=Clubs" },
];

const secondaryNavItems = [
  { title: "LITERATURE", url: "/articles?category=Literature" },
  { title: "SCIENCE AND TECH", url: "/articles?category=science" },
  { title: "NATIONAL ARTICLES", url: "/articles?category=national" },
  { title: "WORLD", url: "/articles?category=world" },
  { title: "BNKS STORIES", url: "/articles?category=bnks" },
];
const finalNavItems = [
  { title: "ABOUT", url: "https://github.com/SuyogPrasai/parewa" },
  { title: "DOCUMENTATION", url: "https://github.com/SuyogPrasai/parewa?tab=readme-ov-file#documentation" },
  { title: "WAYS TO CONTRIBUTE", url: "#" },
  { title: "REPORT A BUG", url: "https://forms.gle/e7LWQa73WBmnsiDS8" },
  { title: "JOBS", url: "https://forms.gle/cybYghNXgoumfKfP6" },
  { title: "CREDITS", url: "#" },
];

const socialIcons = [
  { Icon: Instagram, href: "https://www.instagram.com/parewa_bnks" },
  { Icon: Github, href: "https://github.com/suyogprasai/parewa" },
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
                परेवा_
              </Link>
            </div>

          </div>
          <div className="mx-10">
            <SidebarMenu className="mb-4">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="font-mono text-xl">
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
                  SUBMIT NOTICE <span className="ml-2 text-lg">→</span>
                </button>
              </Link>
            </div>
            <Separator className="bg-black h-[0.0125rem]" />
            <div className="pt-4 mb-2">
              <SidebarMenu>
                {secondaryNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="font-mono text-xl">
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
                <a href="https://github.com/suyogprasai/parewa" aria-label="Facebook"><Github className="h-5 w-5 text-gray-500" /></a>
                <a href="https://www.instagram.com/parewa_bnks" aria-label="Twitter"><Instagram className="h-5 w-5 text-gray-500" /></a>
                <a href="https://www.youtube.com/@parewa_bnks" aria-label="YouTube"><Youtube className="h-5 w-5 text-gray-500" /></a>

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