import { NextRequest, NextResponse } from "next/server";
import { emailVerifySchema } from "@/schemas/emailVerifySchema";
import dbConnect from "@/lib/dbConnect";
import { formQuery } from "@/helpers/formQuery";
import { ChatCompletionResponse } from "@/types/api-responses";
import { ZodError } from "zod";

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

        const query = await formQuery({subject, from, content, recieved_at: recievedAt});

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
            
            const parsedContent = JSON.parse(data.choices[0].message.content);

            // Return successful response with parsed content
            return NextResponse.json(
                { success: true, message: "Email parsed and LLM response received successfully.", parsedContent },
                { status: 200 }
            );
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