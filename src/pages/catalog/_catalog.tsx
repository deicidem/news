import s from './catalogPageStyled.module.scss';
import { Button } from '@/shared/components';
import { ListCardEvent } from '@/widgets';

export const CatalogPage = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.wrapper_actionsBar}>
				<Button label='Все фильтры' view='primary' />
				{/*TODO: сделать потом отдельный компонент для сортировки или взять из MUI. Это должна быть фича*/}
				<Button label='сортировать' view='primary' />
			</div>
			<ListCardEvent />
		</div>
	);
};
