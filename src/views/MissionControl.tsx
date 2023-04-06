import _ from 'lodash';
import React, { useState, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Head from 'next/head'
import Image from 'next/image'


import {
	Grid, Box, BoxProps, Popover, PopoverProps,
	Button, IconButton, Typography, Divider, OutlinedInput, Select, SelectChangeEvent, MenuItem, TextField, Chip,
	Stepper, Step, StepLabel, StepConnector, stepConnectorClasses, StepContent,
} from '@mui/material'
import { styled, useTheme, alpha } from '@mui/material/styles'
import { ArrowForward, ArrowRightAlt, DeleteForeverOutlined, Add, ArrowBack, Check } from '@mui/icons-material'

import MainLayout from '@/layouts/MainLayout'
import CustomPopover, { PopoverItem } from '@/components/CustomPopover'
import CustomBtn1 from '@/components/CustomBtn1'
import CardBlock from '@/components/page2/CardBlock';

import ImgInfo from '@/assets/images/info.svg';
import ImgCopy from '@/assets/images/copy.svg';
import ImgSave from '@/assets/images/tagcross.svg';
import ImgClear from '@/assets/images/archiveadd.svg';
import ImgTrash from '@/assets/images/trash.svg';
import ImgTranslate from '@/assets/images/translate.svg';
import ImgPlay from '@/assets/images/play.svg';
import ImgClock from '@/assets/images/clock.svg';
import ImgLightning from '@/assets/images/lightning.svg';


const PageBody = styled(Box)(({ theme }) => ({
	width: '100%',
	display: 'flex', flexDirection: 'column', flexGrow: 1,

	'& > .header': {
		display: 'flex',
		borderBottom: `1px solid ${theme.palette.divider}`,
		background: theme.palette.background.paper,
		padding: "1rem 3.5rem",
		'& > .header-content': {
		},
		'& > .btn-group': {
			display: 'flex',
			alignItems: 'center',
			gap: 20,
		}
	},
	'& > .content': {
		padding: '2rem 1rem',
		[theme.breakpoints.down('md')]: {
			gap: 4,
		},
		'& .step-process-box': {
			border: `2px solid ${theme.palette.divider}`,
			borderRadius: '0.5rem',
		}
	}
}))

const EditPopover = (props: PopoverProps) => {
	return (
		<CustomPopover {...props}>
			<PopoverItem Icon={<Image className='mr-2' src={ImgCopy} alt="copy icon" />} label="duplicate" onClick={() => console.log("Duplicate clicked")} />
			<PopoverItem Icon={<Image className='mr-2' src={ImgSave} alt="save icon" />} label="save" onClick={() => console.log("Save clicked")} />
			<PopoverItem Icon={<Image className='mr-2' src={ImgClear} alt="clear icon" />} label="clear" onClick={() => console.log("Clear clicked")} />
			<Divider className='border-b-1' />
			<PopoverItem Icon={<Image className='mr-2' src={ImgTrash} alt="trash icon" />} label="Delete" onClick={() => console.log("Delete clicked")} />
		</CustomPopover>
	)
}

type DataType = {
	title: string;
}

const initialDataItem: DataType = {
	title: ''
};
const MissionControl: NextPage = () => {
	const router = useRouter();
	const theme = useTheme();
	const [editPopoverElem, setEditPopoverElem] = useState<HTMLButtonElement>();

	const [data, setData] = useState<DataType[]>([{ title: 'Description-Text / 500 Token' }, { title: 'Description-Text / 300 Token' }]);

	const onPreviousCardEditClick = (e: MouseEvent) => {
		const targetBtn = e.target as HTMLButtonElement;
		setEditPopoverElem(targetBtn);
	}
	const onPreviousCardEditCancel = () => {
		setEditPopoverElem(undefined);
	}

	return (
		<>
			<Head>
				<title>CSV-Upload</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainLayout>
				<PageBody>
					<div className='header'>
						<Box className='flex flex-col mr-auto header-content'>
							<Typography variant='h4'>3. Launch Control</Typography>
							<Typography variant='body1'>Adjust the parameters for text-generation and priiew the Result for a Single Product</Typography>
						</Box>
						<Box className='btn-group'>
							<CustomBtn1 variant='contained' onClick={() => router.push('/page3_1')} disabled>
								<ArrowBack className='mr-2' />
								<span>Select Columns</span>
							</CustomBtn1>
							<CustomBtn1 variant='contained' onClick={() => router.push('/page4')}>
								<span>Launch Control</span>
								<ArrowForward className='ml-2' />
							</CustomBtn1>
						</Box>
					</div>

					<Box className='space-y-4 content grow' sx={{ background: "background.default" }}>
						{data.map((each_data, iData) =>
							<CardBlock
								key={iData}
								title={each_data.title}
								handleEditClick={onPreviousCardEditClick}
							>
								<div className='flex gap-6 px-8'>
									<Stepper
										activeStep={1} orientation="vertical" // alternativeLabel
										connector={<CustomStepConnector />}
									>
										<Step>
											<StepLabel>
												<Typography variant='subtitle1'>Lorem ipsum</Typography>
												<Typography variant='body1'>Lorem consectetur adipiscing elit.</Typography>
											</StepLabel>

											<StepContent>
											</StepContent>
										</Step>
										<Step>
											<StepLabel>
												<Typography variant='subtitle1'>Lorem ipsum</Typography>
												<Typography variant='body1'>Lorem consectetur adipiscing elit.</Typography>
											</StepLabel>
										</Step>
										<Step>
											<StepLabel>
												<Typography variant='subtitle1'>Lorem ipsum</Typography>
												<Typography variant='body1'>Lorem consectetur adipiscing elit.</Typography>
											</StepLabel>
										</Step>
										<Step>
											<StepLabel>
												<Typography variant='subtitle1'>Lorem ipsum</Typography>
												<Typography variant='body1'>Lorem consectetur adipiscing elit.</Typography>
											</StepLabel>
										</Step>
									</Stepper>
								</div>
							</CardBlock>
						)}
						<EditPopover
							open={editPopoverElem !== undefined ? true : false}
							onClose={onPreviousCardEditCancel}
							anchorEl={editPopoverElem}
							anchorOrigin={{
								vertical: 'center',
								horizontal: 'center',
							}}
						/>
					</Box>
				</PageBody>
			</MainLayout>
		</>
	)
}

export default MissionControl;



const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: 'calc(-50% + 16px)',
		right: 'calc(50% + 16px)',
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: theme.palette.secondary.main,
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: theme.palette.secondary.main,
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor: theme.palette.divider,
		borderTopWidth: 2,
		borderLeftWidth: 2,
		borderRadius: 1,
	},
}));
