import Link from "next/link";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="absolute top-0 left-0 z-20 w-full h-20 flex items-center transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center justify-between w-full p-6 bg-opacity-30 text-black1">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="mr-2" />
          <Link href="/">
            <p className="text-3xl md:text-4xl font-bold font-sans">Sachet</p>
          </Link>
        </div>
      </div>
    </header>
  );
}