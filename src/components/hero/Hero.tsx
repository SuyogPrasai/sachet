'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SachetHero() {
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-20 gap-12 bg-gradient-to-br from-[#f3fef3] to-[#e9f8e9] overflow-hidden">
      {/* Dots background */}
      <div
        className="
          absolute inset-0 -z-10 h-full w-full
          bg-[radial-gradient(circle,#b5c9b330_1.5px,transparent_1.5px)]
          bg-[size:28px_28px]
        "
        aria-hidden="true"
      />

      {/* ...your original content here... */}
      {/* Left Content */}
      <div className="text-center md:text-left space-y-4 max-w-xl">
        <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
          <span className="text-black">NAMASTE</span>
          <span className="text-black">.</span>
          <br />
          <span className="text-green-600">THIS IS</span>
          <br />
          <span className="text-green-600">SACHET</span>
          <span className="text-green-600">.</span>
        </h1>
        <p className="text-lg text-gray-800 font-serif">
          I'm a Nepali competition and event discovery platform
          <br />
          designed specifically for high school students across Nepal.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link href="/threads">
            <Button className="bg-white border border-gray-400 text-gray-800 hover:bg-gray-100 font-bold px-6 rounded-none py-6 hover:cursor-pointer">
              EXPLORE EVENTS →
            </Button>
          </Link>
          <Button className="bg-white border border-gray-400 text-gray-800 hover:bg-gray-100 font-bold px-6 rounded-none py-6 hover:cursor-pointer">
            LEARN MORE
          </Button>
        </div>
      </div>

      {/* Right Content (Mock window with image) */}
      <div className="bg-white border border-black shadow-[8px_8px_0px_rgba(0,0,0,0.5)] rounded-md px-6 py-6 w-[400px] relative font-sans">
        {/* Top bar */}
        <div className="flex items-center mb-4">
          <div className="flex space-x-2">
            <span className="h-3 w-3 bg-red-500 rounded-full"></span>
            <span className="h-3 w-3 bg-yellow-400 rounded-full"></span>
            <span className="h-3 w-3 bg-green-500 rounded-full"></span>
          </div>
          <span className="ml-3 text-sm font-mono text-gray-700">brain_with_dhaka.exe</span>
        </div>

        {/* Center content */}
        <div className="flex flex-col items-center">
          <Image
            src="/brain.png"
            alt="Brain with Dhaka Topi"
            width={160}
            height={160}
            className="mb-4"
          />
          <h2 className="text-xl font-bold mb-2">नमस्ते!</h2>
          <p className="text-sm text-center text-gray-600 font-serif">
            Welcome to Nepal's Student Platform
          </p>
        </div>

        {/* Floating decorative squares */}
        <div className="absolute -top-3 -left-3 h-4 w-4 bg-green-500 rotate-45 shadow-md"></div>
        <div className="absolute -top-1 left-6 h-2 w-2 bg-green-300 rotate-45 shadow-sm"></div>
        <div className="absolute -bottom-3 -right-3 h-4 w-4 bg-green-500 rotate-45 shadow-md"></div>
        <div className="absolute bottom-2 right-8 h-2 w-2 bg-green-300 rotate-45 shadow-sm"></div>
      </div>
    </section>
  );
}
