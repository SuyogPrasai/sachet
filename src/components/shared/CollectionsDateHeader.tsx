"use client";

import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';
import CollectionsSearch from './CollectionsSearch';
import { DatePicker } from './DatePicker';

interface CollectionsDateHeaderProps {
  initialDate: string;
  initialPage: number;
  initialQuery: string;
}

function CollectionsDateHeader({
  initialDate,
  initialPage,
  initialQuery,
}: CollectionsDateHeaderProps) {

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
      <div className="relative w-full sm:w-1/2">

        <CollectionsSearch />

      </div>
      <div className="flex justify-center md:justify-end mt-4 sm:mt-0">

        <DatePicker />
      </div>
    </div>
  );
}

export default CollectionsDateHeader;