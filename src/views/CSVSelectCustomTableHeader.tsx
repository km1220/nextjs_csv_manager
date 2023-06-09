import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useAppSelector, useAppDispatch, RootState } from '@/store';
import { useRouter } from 'next/navigation';
import Head from 'next/head'

import {
	Box, Button, Paper, Typography, Checkbox, RadioGroup,
	TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { Autorenew, ArrowForward } from '@mui/icons-material'

import { toast } from 'react-toastify';

import MainLayout from '@/layouts/MainLayout'
import CustomBtn1 from '@/components/CustomBtn1'
import CustomRadio1 from '@/components/CustomRadio1'


const PageBody = styled(Box)(({ theme }) => ({
	width: '100%',
	display: 'flex', flexDirection: 'column', flexGrow: 1,

	'& > .header': {
		display: 'flex',
		background: theme.palette.background.paper,
		borderBottom: `1px solid ${theme.palette.divider}`,
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
		flexGrow: 1,
		padding: '2.5rem 3.5rem',
	}
}))

const DataTableBox = styled(Paper)(({ theme }) => ({
	display: 'flex', flexDirection: 'column',
	borderCollapse: 'collapse',
	overflow: 'auto',
	"& .MuiTableRow-root": {
		borderBottom: `2px solid ${theme.palette.divider}`,
	},
	"& .MuiTableCell-root": {
		maxWidth: '20rem', maxHeight: '3rem',
		padding: '0.75rem',
		overflow: 'auto',
		whiteSpace: 'nowrap',
		borderRight: `1px solid ${theme.palette.divider}`,
		'&::-webkit-scrollbar': { width: '0.125rem', height: '0.125rem' },
		'&::-webkit-scrollbar-thumb': { background: theme.palette.secondary.main },
		'&::-webkit-scrollbar-thumb:hover': { background: theme.palette.secondary.light },
	}
}))

const CSVSelectCustomTableHeader: NextPage = () => {
	const router = useRouter();
	const { file_data: _file, json: _csv_json } = useAppSelector((state: RootState) => state.file);
	const [titleWidthList, setTitleWidthList] = useState<number[]>([]);
	const [selectedRadio, setSelectedRadio] = useState<string>('');

	useEffect(() => {
		if (!_csv_json || !_csv_json.length) {
			toast.error('Excel file is not ready yet.');
			router.replace('/page1_1');
			return;
		}
		const widthArr = Object.keys(_csv_json[0]).map(each_title => each_title.length);
		setTitleWidthList(widthArr);
	}, [_file, _csv_json]);

	return (
		<>
			<Head>
				<title>Index Page</title>
				<meta name="description" content="Index Page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainLayout>
				<PageBody>
					<div className='header'>
						<Box className='flex flex-col mr-auto header-content'>
							<Typography variant='h4'>1. CSV</Typography>
							<Typography variant='body1'>Upload your Table with Product-Data and prepare it for your Mission</Typography>
						</Box>
						<Box className='btn-group'>
							<CustomBtn1 variant='text' onClick={() => router.push('/page1_1')}>
								<Autorenew className='mr-2' />
								<span>Upload Another</span>
							</CustomBtn1>
							<CustomBtn1 onClick={() => router.push('/page1_3')}>
								<span>Select Columns</span>
								<ArrowForward className='ml-2' />
							</CustomBtn1>
						</Box>
					</div>
					<div className='content'>
						<div className='flex flex-col mb-8'>
							<Typography>1.2 Select the Table-Header Row</Typography>
							<Typography variant='subtitle2'>{_file?.name}</Typography>
						</div>
						<TableContainer component={DataTableBox}>
							{_csv_json.length ?
								<RadioGroup value={selectedRadio} onChange={(e => setSelectedRadio(e.target.value))}>
									<Table className='border-collapse' sx={{ width: '100%', tableLayout: "auto" }}>
										<TableHead>
											<TableRow>
												<TableCell>
													<CustomRadio1 size='small' value="" />
												</TableCell>
												{Object.keys(_csv_json[0]).map((each_title, iTitle) => (
													<TableCell key={each_title}>
														<Typography variant='subtitle1'>{each_title}</Typography>
													</TableCell>
												))}
											</TableRow>
										</TableHead>

										<TableBody>
											{_csv_json.map((each_row: { [key: string]: any }, iRow: number) => (
												<TableRow key={iRow}>
													<TableCell>
														<CustomRadio1 size='small' value={iRow} />
													</TableCell>
													{
														Object.keys(each_row).map(each_key => (
															<TableCell key={`${iRow}+${each_key}`}>
																<Typography>{each_row[each_key]}</Typography>
															</TableCell>
														))
													}
												</TableRow>
											))}
										</TableBody>
									</Table>
								</RadioGroup>
								: ''
							}
						</TableContainer>

					</div>
				</PageBody>
			</MainLayout >
		</>
	)
}

export default CSVSelectCustomTableHeader