import React, { Suspense } from 'react';
import { fetchThreads } from '@/lib/application/get-threads';
import PaginationControls from '@/components/shared/Pagination';
import ThreadSection from '@/components/thread/ThreadSection';

interface ThreadsPageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
    query?: string;
    date?: string;
  }>;
}

export default async function ThreadPage({ searchParams }: ThreadsPageProps) {
  const SearchParams = await searchParams;

  const page = Number(SearchParams.page || '1');
  const query = SearchParams.query || '';
  const date = SearchParams.date || '';

  const { threads, totalPages } = await fetchThreads({ page, query, date });

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1000px]">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 mx-auto mt-10">
            <ThreadSection threads={threads} />
          </div>

          <div className="flex justify-center">
            <Suspense fallback={<div>Loading...</div>}>
              <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                debouncedQuery={query}
                selectedDate={new Date(date)}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
