"use client";

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useCallback } from 'react';

function MainSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [search, setSearch] = useState(initialQuery);

  const updateSearchQuery = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set('query', query);
      } else {
        params.delete('query');
      }
      params.set('page', '1');
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearch(newQuery);
    updateSearchQuery(newQuery);
  };

  return (
    <div className="relative w-[400px] max-w-full bg-white">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search competitions, events, and op"
        value={search}
        onChange={handleInputChange}
        className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-none text-md font-serif text-black-700 placeholder:text-gray-400 focus:outline-none"
      />
    </div>
  );
}

export default MainSearch;
