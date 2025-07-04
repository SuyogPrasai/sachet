"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { ITEMS_PER_PAGE, MAX_PAGES_TO_SHOW } from '@/config/site-config';
import { useCallback, JSX } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    category: string;
    debouncedQuery: string;
    selectedDate: Date | null;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    totalPages,
    category,
    debouncedQuery,
    selectedDate,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (page: number) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', page.toString());
            if (debouncedQuery) params.set('query', debouncedQuery);
            else params.delete('query');
            if (selectedDate) {
                const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
                params.set('date', formattedDate);
            } else {
                params.delete('date');
            }
            params.set('category', category);
            return params.toString();
        },
        [debouncedQuery, selectedDate, category, searchParams]
    );

    const handlePageChange = useCallback(
        (page: number) => {
            if (page >= 1 && page <= totalPages) {
                router.push(`?${createQueryString(page)}`);
            }
        },
        [router, createQueryString, totalPages]
    );

    const renderPaginationLinks = useCallback(() => {
        const links: JSX.Element[] = [];
        let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2));
        let endPage = Math.min(totalPages, startPage + MAX_PAGES_TO_SHOW - 1);

        if (endPage - startPage + 1 < MAX_PAGES_TO_SHOW) {
            startPage = Math.max(1, endPage - MAX_PAGES_TO_SHOW + 1);
        }

        if (startPage > 1) {
            links.push(
                <PaginationItem key="1">
                    <PaginationLink
                        onClick={() => handlePageChange(1)}
                        className="cursor-pointer"
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );
            if (startPage > 2) {
                links.push(<PaginationItem key="ellipsis-start"><PaginationEllipsis /></PaginationItem>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            links.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => handlePageChange(i)}
                        isActive={i === currentPage}
                        className="cursor-pointer"
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                links.push(<PaginationItem key="ellipsis-end"><PaginationEllipsis /></PaginationItem>);
            }
            links.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        onClick={() => handlePageChange(totalPages)}
                        className="cursor-pointer"
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return links;
    }, [currentPage, totalPages, handlePageChange]);

    return (
        <Pagination className="mt-3">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        aria-disabled={currentPage === 1}
                        tabIndex={currentPage === 1 ? -1 : undefined}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>
                {renderPaginationLinks()}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        aria-disabled={currentPage === totalPages}
                        tabIndex={currentPage === totalPages ? -1 : undefined}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationControls;