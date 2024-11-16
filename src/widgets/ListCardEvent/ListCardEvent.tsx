'use client';
import './cardEvent.scss';
import { CardEvent } from '@/widgets';
import { eventsMocks } from '@/shared/api/mocks';
import { Pagination, PaginationItem, useMediaQuery } from '@mui/material';
import { ChangeEvent } from 'react';
import { IEvent } from '@/entities/event';
import { Button } from '@/shared/components';
import { usePagination } from '@/shared/hooks/usePagination';
import { LeftArrowIcon, RightArrowIcon } from '@/shared/icons';

export const ListCardEvent = () => {
	const { currentPage, getCurrentData, setPagePaginated, countPages } =
		usePagination<IEvent>(eventsMocks, 6);

	function handlePageChange(_: ChangeEvent<unknown>, page: number) {
		setPagePaginated(page);
	}

	const isSmallScreen = useMediaQuery('(max-width:800px)');

	return (
		<div className='card-list-wrapper'>
			<div className='card-list-wrapper_cards'>
				{getCurrentData().map((item, index) => (
					<CardEvent event={item} key={`${index}-card`} />
				))}
			</div>
			<Pagination
				count={countPages}
				page={currentPage}
				onChange={handlePageChange}
				renderItem={(item) => (
					<PaginationItem
						className={
							item.type === 'page' && item.page === currentPage
								? 'current-page'
								: 'no-current-page'
						}
						slots={{
							previous: () => (
								<Button
									view='outlined-on-dark'
									label={!isSmallScreen ? 'Назад' : ''}
									contentLeft={
										<LeftArrowIcon />
										// <SvgIcon component={LeftArrowIcon} inheritViewBox />
									}
								/>
							),
							next: () => (
								<Button
									view='outlined-on-dark'
									label={!isSmallScreen ? 'Вперёд' : ''}
									contentRight={<RightArrowIcon />}
								/>
							),
						}}
						{...item}
					/>
				)}
			/>
		</div>
	);
};
