import login from '@/features/auth/api/mutations/login';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const user = await login(req.body);
			res.status(200).json(user);
		} catch (error) {
			res.status(401).json({ error: 'Invalid credentials' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
