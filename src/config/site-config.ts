// src/config/site-config.ts
import type { Metadata } from "next";


export const main_metadata: Metadata = {
  title: "Sachet - Your Source for Notices, Articles & News",
  description: "Sachet is a media platform developed and managed by the students of Nepal",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/favicon/site.webmanifest",
      },
    ],
  },
  other: {
    "apple-mobile-web-app-title": "sachet",
  },
};


export const thread_link = "/threads/thread?id=";

export const ITEMS_PER_PAGE = 8;
export const MAX_PAGES_TO_SHOW = 5;