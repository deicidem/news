import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/shared/hooks/storeHooks/useAppSelector';
import { authUserSelectors } from '@/app/store/slices/user';
import { Dropdown } from '@/shared/components';
import s from './styled.module.scss';

export const EditEventBtn = () => {
	const currentPath = usePathname();
	const [showEditBtn, setShowEditBtn] = useState(false);

	const user = useAppSelector(authUserSelectors.getUser);
	useEffect(() => {
		if (
			currentPath === '/admin/managerEvents' &&
			user.isAuth &&
			user.role === 'ADMIN'
		)
			setShowEditBtn(true);
		else setShowEditBtn(false);
	}, [user, currentPath]);

	if (showEditBtn)
		return (
			<Box className={s.menuBtn}>
				<Dropdown items={[{ content: 'one' }, { content: 'two' }]} />
			</Box>
		);
	else {
		return null;
	}
};
