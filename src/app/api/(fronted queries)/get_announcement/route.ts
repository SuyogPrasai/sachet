import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AnnouncementModel from "@/models/Announcements";
import Announcement, { AnnouncementDB } from "@/types/post_objects/announcement";

export async function GET(request: NextRequest) {
    await dbConnect();

    try {
        const announcement: AnnouncementDB | null = await AnnouncementModel
            .findOne({ show: true })
            .sort({ publishedIn: -1 })
            .limit(1);

        if (!announcement) {
            return NextResponse.json(
                {
                    success: true,
                    message: "No active announcement found",
                },
                { status: 200 }
            );
        }

        const parsed_html = announcement.content || "";

        const response_announcement: Announcement = {
            _id: announcement._id,
            title: announcement.title,
            content: announcement.content,
            category: announcement.category,
            publishedIn: announcement.publishedIn,
            publisherID: announcement.publisherID,
            link: announcement.link,
            author: announcement.author,
            show: announcement.show,
            postTags: announcement.postTags,
        };

        return NextResponse.json(
            {
                success: true,
                announcement: response_announcement,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching announcement from the database:", error.message, error.stack);
        return NextResponse.json(
            {
                success: false,
                message: "Error getting announcement",
            },
            { status: 400 }
        );
    }
}