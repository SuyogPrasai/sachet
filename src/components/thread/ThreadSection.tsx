"use client";

import React from "react";
import dynamic from "next/dynamic";
import Thread from "@/types/post_objects/thread";

// Disable SSR for ThreadCard
const ThreadCard = dynamic(() => import("./Thread").then(mod => mod.ThreadCard), { ssr: false });

export default function ThreadSection({ threads }: { threads: Thread[] }) {
  return (
    <div className="mx-0 md:mx-auto lg:mx-0 w-full max-w-2xl flex flex-col items-center">
      {threads.length > 0 ? (
        threads.map((thread) => (
            <ThreadCard
              key={thread._id}
              title={thread.title}
              description={(thread.content ?? "").replace(/<\/?[^>]+(>|$)/g, "")}
              timestamp={new Date(thread.createdAt ?? "").toLocaleString()}
              username={thread.publisher?.[0]?.username || ""}
              tags={thread.postTags}
              initialVotes={thread.voteCount || 0}
              id={thread._id || ""}
              published_for={thread.published_for || ""}
            />
        ))
      ) : (
        <p className="text-muted-foreground">No threads found.</p>
      )}
    </div>
  );
}
