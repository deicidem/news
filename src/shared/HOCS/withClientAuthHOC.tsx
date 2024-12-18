import { ComponentType } from 'react';
import { withAuth } from '@/shared/HOCS/withAuth';

export const withClientAuthHOC = <T extends object>(
	Component: ComponentType<T>
) => withAuth(Component, ['CLIENT']);
