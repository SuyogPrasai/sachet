import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import MainSearch from "../shared/MainSearch";
import Image from "next/image";
import { Oswald } from "next/font/google";
import { Roboto } from "next/font/google";
import { ro } from "date-fns/locale";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-oswald",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-roboto",
});

export function Header() {
  return (
    <header className="w-full h-20 flex items-center bg-white shadow-md px-6">
      <div className="flex items-center justify-between w-full">
        {/* Left: Logo & Sidebar Trigger */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="mr-2" />
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.png" // make sure this file is in the public/ directory
              alt="Sachet Logo"
              width={60}
              height={60}
            />
            <p className={`text-3xl font-bold ${oswald.className}`}>Sachet</p>
          </Link>
        </div>

        {/* Center: Empty space */}
        <div className="flex-grow" />

        {/* Right: Nav and Search */}
        <div className="flex items-center gap-6">
          {/* Navigation Links */}
          <nav className="flex gap-6 text-lg font-medium text-gray-700">
            {["about", "projects", "blog", "contact"].map((page) => (
              <Link
                key={page}
                href={`/${page}`}
                className="relative group transition-colors duration-200 hover:text-green-600"
              >
                <span className={`capitalize ${roboto.className}`} >{page}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="w-64">
            <MainSearch />
          </div>
        </div>
      </div>
    </header>
  );
}
