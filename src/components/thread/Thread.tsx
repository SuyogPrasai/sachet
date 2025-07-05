import React from "react";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
// import VoteComponent from "@/components/articles/VotingComponent";

interface ThreadCardProps {
  title: string;
  description: string;
  timestamp: string;
  username: string;
  tags: string[];
  initialVotes: number;
  id: string;
  published_for: string;
}

export function ThreadCard({
  title,
  description,
  timestamp,
  username,
  tags,
  initialVotes,
  id,
  published_for
}: ThreadCardProps) {

  return (
    <Card className="w-[100%] p-4 bg-background shadow-sm hover:shadow-md transition-shadow mb-3 mx-auto">
      <div className="flex justify-between items-center gap-3">
        <div className="flex-1">
          <Link href={"/threads/thread?id=" + id}>
            <div className="flex flex-wrap flex-row justify-between items-center mb-1">
              <div className="flex flex-row gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-foreground">{title.charAt(0).toUpperCase() + title.slice(1)}</h3>
                <Badge variant="destructive" className="text-xs font-medium px-1.5 py-0.5 mb-2">
                  For {published_for}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground">{timestamp}</span>
            </div>

            <p className="text-xs text-muted-foreground mb-2 cursor-pointer hover:underline">
              @{username}
            </p>
            <p className="text-xs text-muted-foreground mb-2 cursor-pointer hover:underline">

            </p>

            <p className="text-sm text-foreground leading-snug mb-2">{description}</p>

            <div className="flex items-center gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs font-medium px-1.5 py-0.5">
                  #{tag}
                </Badge>
              ))}
            </div>

          </Link>
        </div>
        {/* <VoteComponent orientation="vertical" voteCount={initialVotes} post_id={id} post_type={"thread"} /> */}
      </div>
    </Card>
  );
}
