import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import ThreadModel from "@/models/Thread"; // Assuming ThreadModel is in @/models/Thread
import Thread, { ThreadDB } from "@/types/post_objects/thread";
import { thread_link } from "@/config/site-config"; // Adjusted for threads

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);

  const category_ = searchParams.get("category");
  const page_ = parseInt(searchParams.get("page") || "1", 10);
  const limit_ = parseInt(searchParams.get("limit") || "8", 10);
  const query_ = searchParams.get("query");
  const date_ = searchParams.get("date");
  const excluding = searchParams.get("excluding");

  try {
    let matchConditions: any = {
      trashed: false,
    };

    // Only add category filter if category is provided
    if (category_) {
      matchConditions.category = category_;
    }

    // Handle excluding parameter
    if (excluding) {
      const excludeIds = excluding.split(",").map((id) => id.trim());
      const validObjectIds = excludeIds
        .filter((id) => ObjectId.isValid(id))
        .map((id) => new ObjectId(id));

      if (validObjectIds.length > 0) {
        matchConditions._id = { $nin: validObjectIds };
      }
    }

    if (query_) {
      matchConditions.$or = [
        { title: { $regex: query_, $options: "i" } },
        { content: { $regex: query_, $options: "i" } },
        { postTags: { $regex: query_, $options: "i" } },
      ];
    }

    if (date_) {
      const selectedDate = new Date(date_);
      selectedDate.setUTCHours(0, 0, 0, 0);
      const nextDay = new Date(selectedDate);
      nextDay.setUTCDate(selectedDate.getUTCDate() + 1);

      matchConditions.createdAt = {
        $gte: selectedDate,
        $lt: nextDay,
      };
    }

    const totalThreads = await ThreadModel.countDocuments(matchConditions);
    const totalPages = Math.ceil(totalThreads / limit_);
    const skip = (page_ - 1) * limit_;

    const threads = await ThreadModel.aggregate([
      { $match: matchConditions },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit_ },
    ]);

    if (threads.length === 0) {
      const message =
        totalThreads === 0
          ? category_
            ? "No threads found for this category."
            : "No threads found."
          : "No threads found for this page.";
      return NextResponse.json(
        {
          success: true,
          message,
          threads: [],
          totalPages,
          currentPage: page_,
          totalThreads,
        },
        { status: 200 }
      );
    }

    const transformed_threads: Thread[] = threads.map((thread: any) => {
      const link = thread_link + thread._id;

      return {
        _id: thread._id,
        title: thread.title,
        content: thread.content ? summarizeText(thread.content) : "", // Handle optional content
        published_for: thread.published_for,
        postTags: thread.postTags,
        category: thread.category,
        details: thread.details,
        createdAt: thread.createdAt,
        updatedAt: thread.updatedAt,
        trashed: thread.trashed,
        link,
      };
    });

    return NextResponse.json(
      {
        success: true,
        threads: transformed_threads,
        totalPages,
        currentPage: page_,
        totalThreads,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching threads:", error.message, error.stack);
    return NextResponse.json(
      {
        success: false,
        message: "Error getting threads",
        error: error.message,
      },
      { status: 400 }
    );
  }
}

function summarizeText(htmlString: string): string {
  const text = htmlString.replace(/<\/?[^>]+(>|$)/g, "").trim();
  const words = text.split(/\s+/);
  return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : text;
}