'use client';
import { withClientAuthHOC } from '@/shared/HOCS';

const ClientProfilePage = () => {
	return <div>This is client profile page</div>;
};

export default withClientAuthHOC(ClientProfilePage);
