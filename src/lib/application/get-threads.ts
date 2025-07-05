import axios from 'axios';
import Thread from '@/types/post_objects/thread';
import { ThreadsResponse } from '@/types/api-responses';

// Define the type for query parameters
interface ThreadQueryParams {
  page?: number;
  query?: string;
  date?: string | Date;
  limit?: number;
  [key: string]: string | number | Date | undefined; // Allow additional params
}

export async function fetchThreads(params: ThreadQueryParams = {}): Promise<{
  threads: Thread[];
  totalPages: number;
  error: string | null;
}> {
  try {
    // Default parameters
    const defaultParams = {
      limit: 8,
      ...params,
    };


    // Convert params to query string, handling Date objects and filtering undefined values
    const queryString = Object.entries(defaultParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => {
        const encodedValue =
          value instanceof Date ? value.toISOString().split('T')[0] : String(value);
        return `${encodeURIComponent(key)}=${encodeURIComponent(encodedValue)}`;
      })
      .join('&');
    
    console.log(process.env.BASE_URI)
    const url = `${process.env.BASE_URI}/api/get_threads${queryString ? `?${queryString}` : ''}`;

    const response = await axios.get<ThreadsResponse>(url);

    if (response.data.success) {
      return {
        threads: response.data.threads,
        totalPages: response.data.totalPages || 1, // Fallback to 1 if not provided
        error: null,
      };
    }

    console.log(`API ${url} returned success: false`);
    return {
      threads: [],
      totalPages: 1,
      error: 'API request failed',
    };
  } catch (error: any) {
    console.error('Error fetching threads:', error.message);
    return {
      threads: [],
      totalPages: 1,
      error: error.message || 'Failed to fetch threads',
    };
  }
}