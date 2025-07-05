import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import dbConnect from "@/lib/dbConnect";
import NewsletterModel from "@/models/Newsletter";

export async function POST(request: NextRequest) {
    await dbConnect(); // Ensure DB connection
    try {
        const { email } = await request.json();

        const emailSchema = z.object({
            email: z.string()
                .email("Invalid email format")
        })

        const result = emailSchema.safeParse({ email });
        if (!result.success) {
            const emailErrors = result.error.format().email?._errors || [];
            console.log(result.error.format());
            return Response.json(
                {
                    success: false,
                    message: emailErrors?.length > 0 ? emailErrors.join(', ') : 'Invalid query parameters'
                },
                { status: 400 });
        }

        const newsletter = await NewsletterModel.findOne({ email });
        if (newsletter) {
            console.log("Newsletter already exists");
            return NextResponse.json(
                { success: false, message: "Newsletter already exists" },
                { status: 400 }
            );
        }

        const newNewsletter = new NewsletterModel({ email });
        await newNewsletter.save();
        console.log("Newsletter added successfully");
        return NextResponse.json(
            { success: true, message: "Newsletter added successfully" },
            { status: 200 }
        );

    }
    catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: "Failed to add newsletter" },
            { status: 500 }
        );
    }
}
