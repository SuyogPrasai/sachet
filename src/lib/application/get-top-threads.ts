import axios from "axios";

import Thread from "@/types/post_objects/thread";
import { ThreadsResponse } from "@/types/api-responses";

export async function fetchTopThreads(): Promise<Thread[]> {
    try {
        const response = await axios.get<ThreadsResponse>(`${process.env.BASE_URI}/api/get_threads?top_threads=true`);

        if (response.data.success) {
            return response.data.threads;
        }
        
        console.log("API /api/get_threads?top_threads=true returned success: false")
        return [];

    } catch (error: any) {
        console.error("Error fetching notices:", error);
        return [];

    }
}