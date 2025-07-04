import Link from "next/link";

import { Instagram, Youtube, Github } from 'lucide-react';
import FooterNewsletter from "./FooterNewsletter";

type SocialIconProps = {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
};

const SocialIcon = ({ Icon, href }: SocialIconProps) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <Icon size={24} className="cursor-pointer text-gray-300 hover:text-white transition-colors duration-200" />
  </a>
);

type FooterLinkSectionProps = {
  title: string;
  links: { href: string; text: string }[];
};

const FooterLinkSection = ({ title, links }: FooterLinkSectionProps) => (
  <div>
    {/* Centered text on small screens, left-aligned on medium and larger */}
    <h3 className="text-base font-semibold mb-4 text-white text-center md:text-left">{title}</h3>
    {/* Centered list items on small screens, left-aligned on medium and larger */}
    <ul className="space-y-2 text-sm text-gray-300 text-center md:text-left">
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href} className="hover:text-white transition-colors duration-200">
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// ---
// Data for Links and Social Media
// ---

const Articles = [
  { href: "/articles?category=Literature", text: "Literature" },
  { href: "/articles?category=Science", text: "Science and Tech" },
  { href: "/articles?category=National", text: "National Articles" },
  { href: "/articles?category=World", text: "World" },
  { href: "/articles?category=BNKS", text: "BNKS Stories" },
];
const Notices = [
  { href: "/notices?category=General", text: "Genral News" },
  { href: "/notices?category=Departments", text: "Department's Message" },
  { href: "/notices?category=School", text: "School Administration" },
  { href: "/notices?category=Council", text: "The Student Council" },
  { href: "/notices?category=Clubs", text: "Clubs and Events" },
];

const socialIcons = [
  { Icon: Instagram, href: "https://www.instagram.com/parewa_bnks" },
  { Icon: Github, href: "https://github.com/suyogprasai/parewa" },
  { Icon: Youtube, href: "https://www.youtube.com/@parewa_bnks" },
];

export default function Footer() {
  return (
    <footer className="relative bg-secondary-background text-gray-300 py-16 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col mx-auto max-w-screen-lg"> {/* Removed justify-center here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 justify-center">
            {/* Logo and Description - occupies 1 column on small screens, 1 on medium+ */}
            <div className="md:col-span-1 ">
              <h2 className="text-4xl font-bold mb-4 font-oswald text-white text-center md:text-left">PAREWA</h2>
              <p className="text-sm text-gray-300 mb-6 font-roboto mx-auto md:mx-0 max-w-xs text-center md:text-left "> {/* Added mx-auto for centering */}
                Parewa is a student-driven information delivery platform developed entirely by the students of Budhanilkantha School. <strong>Your news, Your way</strong>
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                {socialIcons.map(({ Icon, href }, index) => (
                  <SocialIcon key={index} Icon={Icon} href={href} />
                ))}
              </div>
            </div>

            {/* Link Sections - occupies 2 columns on medium+ screens, side by side */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:ml-20  font-roboto text-center"> {/* Changed to grid for better control */}
              <FooterLinkSection title="Articles" links={Articles} />
              <FooterLinkSection title="News & Notices" links={Notices} />
            </div>
          </div>

          {/* Newsletter - Full width at the bottom of the main content section */}
          <FooterNewsletter />
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400 text-xs">
          <p>PAREWA © {new Date().getFullYear()} All rights reserved</p>
          <p>6229 Suyog</p>
        </div>
      </div>
    </footer>
  );
}