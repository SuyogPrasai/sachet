// app/thread/page.tsx

import axios from "axios";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import ThreadSection from "@/components/thread/ThreadSection";
import { ThreadCard } from "@/components/thread/Thread"; // Optional: reuse
// import VoteComponent from "@/components/common/VoteComponent";

async function fetchThread(thread_id: string) {
  try {
    const res = await axios.get(
      `${process.env.PAREWA_BASE_URI}/api/get_thread/?id=${thread_id}`
    );
    if (res.data.success) return res.data.thread;
    console.log("Thread fetch unsuccessful.");
    return null;
  } catch (error: any) {
    console.error("Error fetching thread:", error.message);
    notFound();
    return null;
  }
}

async function fetchRelatedThreads({
  category,
  excluding
}: {
  category: string;
  excluding: string;
}) {
  try {
    const res = await axios.get(
      `${process.env.PAREWA_BASE_URI}/api/get_news?category=${category}&limit=3&excluding=${excluding}`
    );
    if (res.data.success) return res.data.threads;
    console.log("Related threads fetch unsuccessful.");
    return [];
  } catch (error: any) {
    console.error("Error fetching related threads:", error.message);
    return [];
  }
}

async function fetchTopArticles() {
  try {
    const res = await axios.get(
      `${process.env.PAREWA_BASE_URI}/api/top_articles`
    );
    if (res.data.success) return res.data.articles;
    return [];
  } catch {
    return [];
  }
}

export default async function ThreadPage({
  searchParams
}: {
  searchParams: { id: string };
}) {
  const thread_id = searchParams?.id || "";
  const thread = await fetchThread(thread_id);
  const relatedThreads = await fetchRelatedThreads({
    category: thread?.category,
    excluding: thread_id
  });

  if (!thread) notFound();

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-10">
        <h1 className="text-4xl sm:text-5xl font-oswald mb-4">Notice</h1>

        {/* Thread Header */}
        <h2 className="text-3xl font-bold font-oswald uppercase mt-4 max-w-3xl">
          {thread.title}
        </h2>
        <Separator className="my-4" />

        {/* Thread Content */}
        <div className="prose prose-base lg:prose-lg max-w-none text-justify mb-6">
          <div dangerouslySetInnerHTML={{ __html: thread?.content || "" }} />
        </div>


        {/* Related Threads */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold font-oswald mb-6 underline underline-offset-8 decoration-gray-200">
            Similar Threads in {thread.category}
          </h3>
          <ThreadSection threads={relatedThreads} />
        </div>
      </div>
    </div>
  );
}
