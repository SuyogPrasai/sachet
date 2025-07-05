import axios from "axios";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import MacWindow from "@/components/shared/MacWindow";
import { Share2 } from "lucide-react";
import Link from "next/link";
import { thread_link } from "@/config/site-config";
import { Oswald, Roboto} from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-oswald",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-roboto",
})

interface Thread {
  _id: string;
  title: string;
  content: string;
  author: string;
  postTags: string[];
  category: string;
  details: Record<string, string>;
  createdAt: string;
  link: string;
  published_for?: string;
}

async function fetchThread(threadId: string): Promise<Thread | null> {
  if (!threadId) return null;

  try {
    const { data } = await axios.get(
      `${process.env.BASE_URI}/api/get_thread`,
      { params: { id: threadId } }
    );
    return data.success ? (data.thread as Thread) : null;
  } catch (err: any) {
    console.error("Thread fetch failed:", err.message);
    return null;
  }
}

export default async function ThreadPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const threadId = await searchParams.id ?? "";
  const thread = await fetchThread(threadId);
  if (!thread) notFound();

  const {
    _id,
    title,
    content,
    author,
    postTags,
    category,
    details,
    createdAt,
    link,
    published_for,
  } = thread;

  const timestamp = createdAt
    ? new Date(createdAt).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kathmandu",
    })
    : "";

  return (
    <div className="min-h-screen flex items-start justify-center bg-[#f5f5f5] pb-10">
      <div className="w-full max-w-5xl p-4 sm:p-6 lg:p-10">
        <MacWindow filename={`${postTags?.[0] || "thread"}_post.dat`}>
          <div className="px-6 py-8">
            {/* Meta Header */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 font-mono mb-4">
              {postTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded bg-green-100 text-green-800 border border-green-300 text-xs"
                >
                  {tag}
                </span>
              ))}
              <span className="bg-black text-white px-3 py-1 text-xs">
                {category}
              </span>
              <span className="text-xs">
                Posted by {author} • {timestamp}
              </span>
              {published_for && (
                <span className="text-xs text-blue-600">
                  Published for {published_for}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className={`text-4xl sm:text-5xl ${oswald.className} mb-6`}>{title}</h1>
            <Separator className="my-6" />

            {/* Content */}
            <article className="prose prose-base lg:prose-lg max-w-none text-justify mb-8">
              {content}
            </article>
            {/* Details Table */}
            {Object.keys(details).length > 0 && (
              <div className="border border-gray-200 p-4 font-mono text-sm w-full rounded-md bg-gray-50 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                  {Object.entries(details).map(([key, value]) =>
                    value ? (
                      <div key={key} className="flex w-full">
                        <span className={`bg-green-800 flex align-center text-white px-2 py-1 rounded-l text-xs font-semibold w-1/3 whitespace-nowrap ${oswald.className}`}>
                          {key.replace(/_/g, " ").toLocaleUpperCase()}
                        </span>
                        <span className={`bg-white text-gray-800 font-bold px-2 py-1 rounded-r w-2/3 ${roboto.className} break-words`}>
                          {value}
                        </span>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            )}


          </div>
        </MacWindow>
      </div>
    </div>
  );
}
