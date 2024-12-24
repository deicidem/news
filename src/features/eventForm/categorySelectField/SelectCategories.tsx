import { useEffect, useState } from 'react';
import { useQuery } from '@blitzjs/rpc';
import getCategories from '@/features/events/api/queries/getCategories';
import { toast } from 'react-toastify';
import { CategorySelectField } from './CategorySelectField';
import { TSelectCategoriesProps } from './types';

export const SelectCategories = ({
	categories,
	onSetCategoriesData,
	...rest
}: TSelectCategoriesProps) => {
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const [categoriesQuery] = useQuery(
		getCategories,
		{
			page,
			limit: 10,
		},
		{
			suspense: true,
			refetchOnWindowFocus: false,
		}
	);

	useEffect(() => {
		if (categoriesQuery?.categories) {
			onSetCategoriesData((prev) =>
				page === 1
					? categoriesQuery.categories
					: [...prev, ...categoriesQuery.categories]
			);
			setHasMore(categoriesQuery.hasMore);
			setLoading(false);
		}
	}, [categoriesQuery, page]);

	const loadMoreCategories = async () => {
		if (hasMore && !loading) {
			try {
				setLoading(true);
				setPage((prev) => prev + 1);
			} catch (error) {
				console.error('Error loading more categories:', error);
				toast.error('Ошибка при загрузке категорий');
			}
		}
	};

	return (
		<CategorySelectField
			name='categoryIds'
			label='Категории'
			options={categories || []}
			loading={loading}
			onLoadMore={loadMoreCategories}
			{...rest}
		/>
	);
};
