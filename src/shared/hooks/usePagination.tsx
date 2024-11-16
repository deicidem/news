'use client';
import { useState } from 'react';

export const MIN_PAGE = 1;

export const usePagination = <T,>(
	data: T[],
	itemsPerPage: number
): {
	getCurrentData: () => T[];
	countPages: number;
	currentPage: number;
	nextPage: () => void;
	prevPage: () => void;
	setPagePaginated: (page: number) => void;
} => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const countPages = Math.ceil(data.length / itemsPerPage);

	function getCurrentData() {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return data.slice(start, end);
	}

	function nextPage() {
		setCurrentPage((currentPage) => Math.min(currentPage + 1, countPages));
	}

	function prevPage() {
		setCurrentPage((currentPage) => Math.max(currentPage - 1, MIN_PAGE));
	}

	function setPagePaginated(page: number) {
		const pageNumber = Math.max(MIN_PAGE, page);
		setCurrentPage(() => Math.min(pageNumber, countPages));
	}

	return {
		getCurrentData,
		countPages,
		currentPage,
		nextPage,
		prevPage,
		setPagePaginated,
	};
};
