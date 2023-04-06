import * as XLSX from 'xlsx';
import React, { useState, useCallback, useEffect, MouseEvent } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { setLoading, endLoading } from '@/store/reducers/settings';
import { setFile, resetFile, setJSONData, resetJSONData } from '@/store/reducers/file_info';
import { useDropzone } from 'react-dropzone';

import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Head from 'next/head'
import Image from 'next/image'

import { Box, BoxProps, PopoverProps, IconButton, Typography, Divider, RadioGroup } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ArrowForward, RefreshOutlined } from '@mui/icons-material'

import MainLayout from '@/layouts/MainLayout'
import CustomPopover, { PopoverItem } from '@/components/CustomPopover'
import CustomBtn1 from '@/components/CustomBtn1'
import CustomRadio1 from '@/components/CustomRadio1'
// import Snackbar from '@/components/Snackbar';

import ImgClock from '@/assets/images/clock.svg';
import ImgTrippleDot from '@/assets/images/three-dots.svg';
import ImgCopy from '@/assets/images/copy.svg';
import ImgTrash from '@/assets/images/trash.svg';
import { toast } from 'react-toastify';


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
		display: 'flex', flexDirection: 'column', flexGrow: 1,
		padding: '2.5rem 3.5rem',
	}
}))
const FileUploadZone = styled(Box)(({ theme }) => ({
	minHeight: '20vh',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	border: `0.2rem dashed ${theme.palette.primary.main}`,
	borderRadius: '0.5rem',
	padding: '2rem',
	gap: 15,
}))


//////////////////////////// CSV CARD Component /////////////////////////////////
interface PreviousCardProps extends BoxProps {
	index: number,
	title: string | undefined,
	handleEditClick: React.MouseEventHandler
}
const PreviousCardComponent = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: '1.5rem 2rem',
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: '1rem',
	'& > .card-title': { margin: '0 1.5rem', flexGrow: 1 }
}))
const PreviousCard = ({ index, title, handleEditClick, ...others }: PreviousCardProps) => React.createElement(PreviousCardComponent, {
	className: 'previous-select-card',
	...others
},
	<>
		<CustomRadio1 className='card-radio' value={index} />
		<Typography className='card-title' variant='h6' sx={{ fontWeight: 900 }}>{title}</Typography>
		<IconButton className='card-edit-btn' onClick={handleEditClick}>
			<Image src={ImgTrippleDot} width={24} height={24} alt='three dots' />
		</IconButton>
	</>
);
PreviousCard.defaultProps = {
	index: 0,
	title: '',
	handleEditClick: () => ({})
}
//////////////////////////////////////////////////////////////////////////////////


const EditPopover = (props: PopoverProps) => {
	return (
		<CustomPopover {...props}>
			<PopoverItem Icon={<Image className='mr-2' src={ImgCopy} alt="copy icon" />} label="duplicate" onClick={() => console.log("Duplicate clicked")} />
			<Divider className='border-b-1' />
			<PopoverItem Icon={<Image className='mr-2' src={ImgTrash} alt="trash icon" />} label="Delete" onClick={() => console.log("Delete clicked")} />
		</CustomPopover>
	)
}

const CSVUpload2: NextPage = () => {
	const router = useRouter();
	const _file = useAppSelector((state) => state.file.file_data);
	const dispatch = useAppDispatch();

	const [files, setFiles] = useState<File[]>([]);
	const [selectedFileIndex, setSelectedFileIndex] = useState('');
	const [editPopoverElem, setEditPopoverElem] = useState<HTMLButtonElement>();

	useEffect(() => {
		if (!_file) return;
		setFiles([_file]);
		setSelectedFileIndex('0');
	}, [])
	useEffect(() => {
		if (!files.length) return;
		dispatch(setFile(files[parseInt(selectedFileIndex)]))
	}, [selectedFileIndex])
	useEffect(() => {
		if (!_file) {
			setSelectedFileIndex('');
			return;
		}
		const readDataXLSX = async () => {
			dispatch(setLoading());
			const f = await _file.arrayBuffer();
			const workbook = XLSX.read(f, { type: "base64" });
			const worksheet = workbook.Sheets[workbook.SheetNames[0]];

			// const headers = XLSX.utils.sheet_to_json(worksheet)[0];
			// const data = XLSX.utils.sheet_to_json(worksheet, { header: ['Product_Title', 'Produkttyp', 'Weintyp', 'Weinart', 'Weinfarbe', 'Geschmack', 'Anlass und Thema', 'Jahrgang', 'Land', 'Anbaugebiet', 'Unterregion', 'Rebsorten', 'Cuvée', 'Ausbau', 'Ausbau-Details', 'Qualitätsklassifikation & Prädikate', 'PrÃ¤mierungen', 'Böden & Sonderlagen', 'Lesart', 'Aroma', 'Textur / Mundgefüh', 'Nachhall / Finale', 'Stil', 'Optimale Serviertemperatur', 'Speiseempfehlungen', 'Glasempfehlung', 'Flaschengröße in l', 'Flaschendesign & Ausstattung', 'Verschlusstyp', 'Lagerfähigkeit in Jahren ab JG', 'Alkohol in Vol%:', 'Allergene und Inhaltsstoffe', 'Inverkehrbringer', 'Gesamtsäure ca. in g/l', 'Restzucker ca. in g/l', 'Prämierungen', 'Textur / Mundgefühl', 'Ausbaudauer in Mon', 'Empfehlung', 'Art.-Nr.', 'Product_Highlight_1', 'Product_Highlight_2', 'Product_Highlight_3', 'Brand_icon', 'Brand_Link', 'Brand_Name', 'Product_Image', 'Description', 'Product_URL'] });
			const data = XLSX.utils.sheet_to_json(worksheet) as object[];
			dispatch(setJSONData(data));
			dispatch(endLoading());
		}
		readDataXLSX();
	}, [_file]);


	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			if (
				file.type === "application/vnd.ms-excel" ||
				file.type === "text/csv" ||
				file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			) {
				toast('👌 Sucessfully imported');
				setFiles((prevFiles: File[]) => [...prevFiles, file]);
			}
			else {
				toast('❗ Only Excel files are allowed.', { hideProgressBar: true });
			}
		},
		[setFiles]
	);
	const { getRootProps, getInputProps, open } = useDropzone({
		noClick: true,
		maxFiles: 1,
		multiple: false,
		onDrop
	});


	const onPreviousCardEditClick = (e: MouseEvent) => {
		const targetBtn = e.target as HTMLButtonElement;
		setEditPopoverElem(targetBtn);
	}
	const onPreviousCardEditCancel = () => {
		setEditPopoverElem(undefined);
	}

	const handleReset = () => {
		dispatch(resetFile())
		dispatch(resetJSONData());
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
							<Typography variant='h4'>1. CSV</Typography>
							<Typography variant='body1'>Upload and prepare your Table with Product-Information</Typography>
						</Box>
						<Box className='btn-group'>
							<CustomBtn1 variant='outlined'
								disabled={_file === undefined}
								onClick={handleReset}
							>
								<RefreshOutlined className='mr-2' />
								<span>Reset</span>
							</CustomBtn1>
							<CustomBtn1 variant='contained' onClick={() => router.push('/page1_2')}
								disabled={selectedFileIndex === ""}
							>
								<span>Select Columns</span>
								<ArrowForward className='ml-2' />
							</CustomBtn1>
						</Box>
					</div>

					<div className='content'>
						<Typography variant='subtitle1'>1.1  Upload your Table with product-data</Typography>
						<div className='mb-4' />

						<FileUploadZone className='grow' {...getRootProps()}>
							<input
								accept='text/csv'
								// accept='text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
								{...getInputProps()}
							/>
							<Typography variant='subtitle1' sx={{ fontSize: '1.5rem' }}>Upload .xlsx, xls or .csv file</Typography>
							<CustomBtn1 variant='contained' sx={{ px: 2, py: 1 }} onClick={open}>Select File</CustomBtn1>
						</FileUploadZone>

						{files.length ?
							<>
								<Divider className='my-3 border-b-2' />
								<div className='flex items-center gap-6 mb-4'>
									<Image src={ImgClock} alt='clock icon' width={16} height={16} />
									<Typography variant='subtitle1'>Previous Product-Table</Typography>
								</div>
								<RadioGroup className='space-y-2' value={selectedFileIndex} onChange={(e => setSelectedFileIndex(e.target.value))}>
									{files.map((file, i) => (
										<PreviousCard key={i} index={i} title={`${file.name} - ${file.size} bytes`} handleEditClick={onPreviousCardEditClick} />
									))}

									<EditPopover
										open={editPopoverElem !== undefined ? true : false}
										onClose={onPreviousCardEditCancel}
										anchorEl={editPopoverElem}
										anchorOrigin={{
											vertical: 'center',
											horizontal: 'center',
										}}
									/>
								</RadioGroup>
							</>
							:
							''
						}
					</div>
					{/* <Snackbar open={true} severity="success" message='test test test' time={2000} onClose={() => { }} /> */}
				</PageBody>
			</MainLayout>
		</>
	)
}

export default CSVUpload2