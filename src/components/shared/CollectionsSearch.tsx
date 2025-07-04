"use client";

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useCallback } from 'react';
import { Input } from '../ui/input';

function CollectionsSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [search, setSearch] = useState(initialQuery);

  // Function to update the URL with the new search query
  const updateSearchQuery = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set('query', query);
      } else {
        params.delete('query');
      }
      params.set('page', '1'); // Reset to page 1 on new search
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearch(newQuery);
    updateSearchQuery(newQuery);
  };

  return (
    <div className="relative w-full">

      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
      <Input
        onChange={handleInputChange}
        type="text"
        placeholder="Search articles..."
        className="pl-10 w-full text-sm sm:text-base"
        value={search}
      />

    </div>
  );
}

export default CollectionsSearch;