import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import ThreadModel from "@/models/Thread";
import { thread_link } from "@/config/site-config";

export async function GET(request: Request) {
  await dbConnect();

  // grab id from ?id=6868...
  const id = new URL(request.url).searchParams.get("id");

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid thread ID" },
      { status: 400 },
    );
  }

  try {
    const thread = await ThreadModel.findById(id);

    if (!thread || thread.trashed) {
      return NextResponse.json(
        { success: false, message: "Thread not found." },
        { status: 404 },
      );
    }

    const result = {
      _id: thread._id,
      title: thread.title,
      author: thread.author,
      content: thread.content ?? "",
      published_for: thread.published_for,
      postTags: thread.postTags,
      category: thread.category,
      details: thread.details,
      createdAt: thread.createdAt,
      updatedAt: thread.updatedAt,
      trashed: thread.trashed,
      link: thread_link + thread._id,
    };

    return NextResponse.json({ success: true, thread: result }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching thread:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch thread.", error: error.message },
      { status: 500 },
    );
  }
}
