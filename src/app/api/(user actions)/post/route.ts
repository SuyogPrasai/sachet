import { NextRequest, NextResponse } from "next/server";
import { emailVerifySchema } from "@/schemas/emailVerifySchema";
import dbConnect from "@/lib/dbConnect";
import { formQuery } from "@/helpers/formQuery";
import { ChatCompletionResponse } from "@/types/api-responses";
import { ZodError } from "zod";
import { parse } from "path";
import ThreadModel from "@/models/Thread";

export async function POST(request: NextRequest) {
    // Ensure DB connection
    await dbConnect();

    try {
        const { subject, from, content, recieved_at } = await request.json();

        // Input validation using Zod
        try {
            console.log(from)
            await emailVerifySchema.parseAsync({ email: from });
        } catch (error) {
            if (error instanceof ZodError) {
                console.error("Email validation failed:", error.errors);
                return NextResponse.json(
                    { success: false, message: "Invalid email format.", errors: error.errors },
                    { status: 400 }
                );
            }
            throw error; // Re-throw if it's not a ZodError
        }

        const recievedAt = new Date(recieved_at);

        const query = await formQuery({ subject, from, content, recieved_at: recievedAt });

        console.log(JSON.stringify(query))

        // Fetch from LLM API
        try {

            const response = await fetch(`${process.env.LLM_API}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(query),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`LLM API HTTP error! Status: ${response.status}, Response: ${errorText}`);
                return NextResponse.json(
                    { success: false, message: "Failed to fetch from LLM API.", details: errorText },
                    { status: response.status }
                );
            }

            const data = (await response.json()) as ChatCompletionResponse;

            // Validate LLM API response format
            if (!data.choices || !data.choices[0]?.message?.content) {
                console.error("Invalid response format from LLM API:", data);
                return NextResponse.json(
                    { success: false, message: "Invalid response format from LLM API." },
                    { status: 500 }
                );
            }

            try {
                // 1. Robust Parsing of the LLM Response
                let parsedContent;
                try {
                    parsedContent = JSON.parse(data.choices[0].message.content);
                } catch (parseError) {
                    console.error('Error parsing LLM response as JSON:', parseError);
                    return NextResponse.json(
                        { success: false, message: "LLM response is not valid JSON." },
                        { status: 400 } // Bad Request
                    );
                }

                // Ensure parsedContent is an object
                if (typeof parsedContent !== 'object' || parsedContent === null) {
                    console.error('Parsed LLM content is not an object:', parsedContent);
                    return NextResponse.json(
                        { success: false, message: "LLM response content is not a valid object." },
                        { status: 400 } // Bad Request
                    );
                }

                // 2. Extracting Data with Fallbacks
                // Note: event_date is extracted but not used in ThreadModel.create in your original snippet.
                const event_date = parsedContent.date;
                const content = parsedContent.content || "No content provided."; // Provide a default if content is missing
                const author = parsedContent.author || "Unknown Author"; // Provide a default
                const details = parsedContent.details || "No details provided."; // Provide a default

                // IMPORTANT: Provide default values or handle required fields explicitly
                const category = parsedContent.category || "Uncategorized"; // Default category
                const tags = parsedContent.tags || []; // Default to empty array if no tags
                const published_for = parsedContent.published_for || "All Users"; // Default audience

                // 'publishedIn' was missing from your original ThreadModel.create call.
                // You need to determine the correct value for this based on your application's logic.
                // For now, I'll use a placeholder or the current date.
                const publishedIn = parsedContent.publishedIn || new Date().toISOString(); // Example: Use current date or from LLM

                // 3. Database Interaction (Creating a Thread)
                const thread = await ThreadModel.create({
                    title: subject, // 'subject' is assumed to be defined elsewhere in the scope
                    content,
                    category,
                    details,
                    published_for,
                    postTags: tags,
                    publishedIn: publishedIn // Added the missing required field
                });

                console.log('Thread created successfully:', thread);

                // Return successful response with parsed content
                return NextResponse.json(
                    { success: true, message: "Email parsed and LLM response received successfully.", parsedContent },
                    { status: 200 }
                );

            } catch (error: any) {
                console.error('Error creating thread:', error);

                // Check if the error is a Mongoose/database validation error
                if (error.name === 'ValidationError') {
                    const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                    return NextResponse.json({
                        success: false,
                        message: "Thread validation failed.",
                        errors: errors
                    }, { status: 400 }); // Bad Request due to validation
                } else {
                    // Generic error response for other types of errors
                    return NextResponse.json({
                        success: false,
                        message: "An unexpected error occurred while creating the thread."
                    }, { status: 500 }); // Internal Server Error
                }
            }
        } catch (error) {
            console.error("Error communicating with LLM API:", error);
            return NextResponse.json(
                { success: false, message: "Error during LLM API communication." },
                { status: 500 }
            );
        }
    } catch (error) {
        // Catch-all for any other unexpected errors
        console.error("An unexpected error occurred:", error);
        return NextResponse.json(
            { success: false, message: "An unexpected error occurred during email processing." },
            { status: 500 }
        );
    }
}