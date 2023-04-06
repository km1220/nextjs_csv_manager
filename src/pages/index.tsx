import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import LoadingScreen from '@/components/LoadingPage';

const Home: NextPage = () => {
	const router = useRouter();
	useEffect(() => {
		router.push('/page1_1');
	}, []);
	return <LoadingScreen />;
}

export default Home
