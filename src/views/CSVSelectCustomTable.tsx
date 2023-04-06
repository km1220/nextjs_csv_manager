import _ from 'lodash';
import * as XLSX from 'xlsx';
import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useAppSelector, useAppDispatch, RootState } from '@/store';
import { setLoading, endLoading } from '@/store/reducers/settings';
import {
	// set as setFileInfo, reset as resetFileInfo,
	setJSONData, resetJSONData
} from '@/store/reducers/file_info';
import { useRouter } from 'next/navigation';
import Head from 'next/head'
import Image from 'next/image'

import { Box, Button, Paper, Typography, Checkbox, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, OutlinedInput } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { Autorenew, ArrowForward, DoneOutlineOutlined } from '@mui/icons-material'

import { toast } from 'react-toastify';

import MainLayout from '@/layouts/MainLayout'
import CustomBtn1 from '@/components/CustomBtn1'
import CustomCheckbox1 from '@/components/CustomCheckbox1'

import ImgSax from '@/assets/images/pen.svg';


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
	// padding: '1rem 1.5rem 0.75rem',
	borderCollapse: 'collapse',
	// borderRadius: '1rem',
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

const CSVSelectCustomTable: NextPage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const {
		file_data: _file,
		// workbook: _workbook,
		// worksheet: _worksheet,
		json: _csv_json,
	} = useAppSelector((state: RootState) => state.file);
	const [headerCSV, setCSVHeader] = useState<string[]>([]);

	useEffect(() => {
		if (!_csv_json || !_csv_json.length) {
			toast.error('Excel file is not ready yet.');
			router.replace('/page1_1');
			return;
		}
		setCSVHeader(Object.keys(_csv_json[0]));
	}, [_file, _csv_json]);


	const handleHeaderCellChange = async (index: number, newHeaderText: string) => {
		if (!_file) {
			toast.error('Excel file is not ready yet.');
			router.replace('/page1_1');
			return;
		}

		const updated_csv_json = _.map(_csv_json, each_row =>
			_.mapKeys(each_row, (each_cell, each_title) =>
				each_title === headerCSV[index] ? newHeaderText : each_title
			)
		);
		console.log('--------------------------------', updated_csv_json);
		dispatch(setJSONData(updated_csv_json));

		// Update the header row state variable.
		let newHeader = [...headerCSV];
		newHeader[index] = newHeaderText;
		setCSVHeader(newHeader);
		console.log(index, '===', newHeaderText, headerCSV, '----', newHeader);

		dispatch(setLoading());
		const f = await _file.arrayBuffer();
		const workbook = XLSX.read(f, { type: "base64" });
		const worksheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[worksheetName];

		// Modify the newly updated header row
		const newWorksheet = XLSX.utils.sheet_add_aoa(worksheet, [newHeader], { origin: 0 });
		workbook.Sheets[worksheetName] = newWorksheet;
		dispatch(endLoading());

		// Convert the updated data to a Blob object
		const updatedExcelData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
		const blob = new Blob([updatedExcelData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

		// Save the file with the updated header cell value
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "updated-file.xlsx";
		a.click();
		window.URL.revokeObjectURL(url);
	};

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
							<CustomBtn1 onClick={() => router.push('/page2')}>
								<span>Enter Test</span>
								<ArrowForward className='ml-2' />
							</CustomBtn1>
						</Box>
					</div>
					<div className='content'>
						<div className='flex flex-col mb-8'>
							<Typography>1.3  Select all relevant Colums needed for your generation and re-name them if neccessery for the AI to understand</Typography>
							<Typography variant='subtitle2'>{_file?.name}</Typography>
						</div>

						<TableContainer component={DataTableBox}>
							{_csv_json.length ?
								<Table className='border-collapse' sx={{ width: '100%', tableLayout: "auto" }}>
									<TableHead>
										<TableRow>
											{headerCSV.map((each_title, iTitle) => (
												<TableEditableCell key={iTitle} title={each_title}
													handleChange={(newText: string) => handleHeaderCellChange(iTitle, newText)}
												/>
											))}
										</TableRow>
									</TableHead>

									<TableBody>
										{_csv_json.map((each_row: { [key: string]: any }, iRow: number) => (
											<TableRow key={iRow}>
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
								: ''
							}
						</TableContainer>
					</div>
				</PageBody>
			</MainLayout >
		</>
	)
}

export default CSVSelectCustomTable



const TableEditableCell = ({
	title = '', handleChange = (text: string) => { },
	className = '', ...others
}) => {
	const [flagEdit, setFlagEdit] = useState(false);
	const [text, setText] = useState<string>(title);

	const onEdit = () => setFlagEdit(true);
	const onEditDone = () => {
		setFlagEdit(false);
		handleChange(text);
	}
	return (
		<TableCell className={`w-max ${className}`} {...others}>
			<div className='flex items-center justify-center gap-4 '>
				<CustomCheckbox1 size='small' />
				{flagEdit == false ?
					<>
						<Typography variant='subtitle1'>{text}</Typography>
						<Image
							className='cursor-pointer'
							src={ImgSax} alt="Icon Sax"
							onClick={onEdit}
						/>
					</>
					:
					<>
						<OutlinedInput classes={{ input: 'w-auto px-4 py-0' }} value={text} onChange={e => setText(e.target.value)} />
						<DoneOutlineOutlined
							className='cursor-pointer' color='primary'
							onClick={onEditDone}
							sx={{ fontSize: '1rem' }}
						/>
					</>
				}
			</div>
		</TableCell>
	)
}