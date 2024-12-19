import { withClientAuthHOC } from '@/shared/HOCS';

const ClientAccount = () => {
	return <div>Client Account</div>;
};

export default withClientAuthHOC(ClientAccount);
