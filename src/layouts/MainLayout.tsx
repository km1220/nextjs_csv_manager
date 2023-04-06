import { ReactNode } from "react";
import { useAppSelector } from '@/store';

import LoadingScreen from '../components/LoadingPage';
import LeftSidebar from './LeftSideBar';

interface Props {
	children: ReactNode
}

const MainLayout = ({ children }: Props) => {
	const { loading } = useAppSelector(state => state.settings);
	return (
		<>
			{loading ?
				<LoadingScreen className="fixed w-screen h-screen z-50" /> : ''
			}
			<div style={{ display: 'flex', minHeight: '100vh' }}>
				{/* Left Sidebar Panel */}
				<LeftSidebar sx={{ position: 'fixed' }} />
				{/* Main Panel */}
				<div style={{ marginLeft: '60px', display: 'flex', width: 'calc(100vw - 60px)', overflowY: 'hidden' }}>
					{children}
				</div>
			</div>
		</>
	);
}

export default MainLayout;