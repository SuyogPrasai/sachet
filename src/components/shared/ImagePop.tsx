"use client"
import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

type PopImageProps = ImageProps;

export default function PopImage({ className = "", ...props }: PopImageProps) {
  const [open, setOpen] = useState(false);

  // Allow ESC key to close
  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, []);

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-zoom-in">
        <Image {...props} className={`rounded-md ${className}`} />
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-60 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200 backdrop-blur-sm group"
          >
            <svg
              className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div
            className="relative w-full max-w-4xl max-h-[90vh] aspect-video animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              {...props}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}