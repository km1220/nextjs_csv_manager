import type { NextComponentType } from 'next'
import Image from "next/image";
import Link from 'next/link'

import { Box, Tooltip } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'

import ImgLogo from '@/assets/images/logo.svg';
import ImgBtn1 from '@/assets/images/button1.svg';
import ImgBtn2 from '@/assets/images/button2.svg';
import ImgBtn3 from '@/assets/images/button3.svg';
import ImgBtn4 from '@/assets/images/button4.svg';
import ImgUser from '@/assets/images/user.svg';
import ImgSetting from '@/assets/images/settings.svg';
import { BoxProps } from '@mui/system';


const SideBarComponent = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	width: '60px',
	height: '100vh',
	overflowX: 'hidden',
	overflowY: 'auto',
	alignItems: 'center',
	padding: "1.5rem 0.625rem",
	borderRight: `1px solid ${theme.palette.divider}`,
	gap: '1rem',
	background: theme.palette.background.paper,
	'& a, img': { width: '2.5rem', height: '2.5rem' },
	'& svg': { width: '2.5rem', height: '2.5rem', padding: '0.5rem' },
	'& > .logo': {
		// padding: "1rem 0 1rem"
	},
	'& > .nav-container': {
		display: 'flex', flexDirection: 'column',
		// padding: "2.5rem 0 1.25rem",
		gap: '0.25rem',
		'& > a': {
			borderRadius: '100%',
			color: theme.palette.text.disabled,
			'&.active': {
				background: alpha(theme.palette.secondary.light, 0.2),
				color: theme.palette.primary.light,
				borderRadius: 0,
			}
		}
	},
	'& > .setting-container': {
		display: 'flex', flexDirection: 'column',
		// padding: "2.5rem 0 1.25rem",
		gap: '0.75rem'
	}
}))

const LeftSideBar = (props: BoxProps) => {
	return (
		<SideBarComponent {...props}>
			{/* Logo */}
			<Box className='logo'>
				<Link href='/'><Image src={ImgLogo} alt='Logo Image' /></Link>
			</Box>

			{/* Navigation */}
			<Box className='nav-container'>
				<Link href='/page1_1'>
					<Tooltip title="1 - 1" placement="right">
						<Image src={ImgBtn1} alt='1 - 1' />
					</Tooltip>
				</Link>
				<Link href='/page1_2'>
					<Tooltip title="1 - 2" placement="right">
						<Image src={ImgBtn1} alt='1 - 2' />
					</Tooltip>
				</Link>
				<Link href='/page1_3'>
					<Tooltip title="1 - 3" placement="right">
						<Image src={ImgBtn1} alt='1 - 3' />
					</Tooltip>
				</Link>
				<Link href='/page2'>
					<Tooltip title="2" placement="right">
						<Image src={ImgBtn2} alt='2' />
					</Tooltip>
				</Link>
				<Link href='/page3_1'>
					<Tooltip title="3 - 1" placement="right">
						<Image src={ImgBtn3} alt='3 - 1' />
					</Tooltip>
				</Link>
				<Link href='/page3_2'>
					<Tooltip title="3 - 2" placement="right">
						<Image src={ImgBtn4} alt='3 - 2' />
					</Tooltip>
				</Link>
			</Box>

			<div className='grow' />

			{/* Settings */}
			<Box className='setting-container'>
				<Link href='/'><Image src={ImgUser} alt='User' /></Link>
				<Link href='/'><Image src={ImgSetting} alt='User' /></Link>
			</Box>
		</SideBarComponent>
	)
}

export default LeftSideBar;