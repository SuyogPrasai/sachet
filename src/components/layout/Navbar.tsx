"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";


function Navbar({ header_click, wordpress_ip }: any) {
  const [activeLink, setActiveLink] = useState("General"); // State to track active link

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
    header_click(linkName);
  };

  // Define your navigation links in an array
  const navLinks = [
    { name: "General", href: "#" },
    { name: "Departments", href: "#" },
    { name: "School", href: "#" },
    { name: "Council", href: "#" },
    { name: "Clubs", href: "#" },
  ];

  return (
    <div className="bg-white mx-auto lg:relative lg:block shadow-sm">
      <div className="container mx-auto px-4 relative">
        <nav className="flex lg:flex-row items-center justify-center">
          {/* Desktop Navigation */}
          <div className="flex justify-center">
            <NavigationMenu className="lg:flex">
              <NavigationMenuList className="flex md:flex-row md:mt-0 mt-5 flex-col space-x-0">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink
                      className="py-2 px-6 flex items-center justify-center text-black text-lg font-bold hover:cursor-pointer"
                      style={{
                        backgroundColor:
                          activeLink === link.name
                            ? "hsl(var(--primary-high-bright))"
                            : "white",
                        color: activeLink === link.name ? "white" : "black",
                        minWidth: "100px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        letterSpacing: "0.05em",
                        fontFamily: "monospace, sans-serif",
                      }}
                      onClick={() => handleLinkClick(link.name)}
                    >
                      {link.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* About and Contact Buttons */}
          <div className="hidden lg:flex space-x-0 h-[60px] items-center ml-10">
            <div
              className="py-2 px-6 flex items-center justify-center hover:cursor-pointer text-black text-lg font-bold"
              style={{
                backgroundColor: "hsl(var(--primary-low-bright))",
                color: "black",
                minWidth: "100px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                letterSpacing: "0.05em",
                fontFamily: "monospace, sans-serif",
              }}
            >
              <Link href="https://github.com/SuyogPrasai/parewa" target="_blank">
                ABOUT
              </Link>
            </div>
            <div
              className="py-2 px-6 flex items-center justify-center hover:cursor-pointer text-white text-lg font-bold"
              style={{
                backgroundColor: "hsl(var(--primary-high-bright))",
                color: "white",
                minWidth: "100px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                letterSpacing: "0.05em",
                fontFamily: "monospace, sans-serif",
              }}
            >

              <Link href={wordpress_ip || ""} target="_blank">
                SUBMIT
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div className="min-w-[150px] relative">
        <Image
          src="/lightning.png"
          alt="Eagle Logo"
          width={150}
          height={150}
          className="hidden lg:block object-contain absolute left-[5%] top-0 w-[20%] max-w-[300px] 3xl:right-none select-none"
          draggable={false}
        />
      </div>
    </div>
  );
};

export { Navbar };