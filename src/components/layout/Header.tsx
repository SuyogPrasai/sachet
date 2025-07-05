import Link from "next/link";

import { SidebarTrigger } from "@/components/ui/sidebar";
import MainSearch from "../shared/MainSearch";

export function Header() {
  return (
    <header className="w-full h-20 flex items-center transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex flex-col md:flex-row items-center justify-between w-full p-6 bg-opacity-30 text-black">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="mr-2" />
          <Link href="/">
            <p className="text-3xl md:text-4xl font-bold font-sans">Sachet</p>
          </Link>
        </div>
        <div className="flex items-center gap-2 mx-auto">
          <MainSearch  />
        </div>
        <div className="ml-25"></div>
      </div>
    </header>
  );
}