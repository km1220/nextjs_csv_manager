import * as React from 'react';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';

type Option = {
	label: string;
	value: string;
}

const options: Option[] = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
	{ label: 'Option 4', value: 'option4' },
	{ label: 'Option 5', value: 'option5' },
];

export default function MultiSelectInput() {
	const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);

	const handleDeleteOption = (optionToDelete: Option) => () => {
		setSelectedOptions(prevSelectedOptions =>
			prevSelectedOptions.filter(option => option.value !== optionToDelete.value)
		);
	};

	console.log(Object.keys({ aaa: '123', bbb: '534', ccc: '24234' }))

	return (<>
		<Stack direction="row" spacing={1} alignItems="center">
			<Select
				multiple
				label="Select options"
				value={selectedOptions}
				onChange={event => {
					const value = event.target.value as Option[];
					setSelectedOptions(value);
				}}
				renderValue={selected => (
					<Stack direction="row" spacing={1} flexWrap="wrap">
						{(selected as Option[]).map(option => (
							<Chip
								key={option.value}
								label={option.label}
								onDelete={handleDeleteOption(option)}
							/>
						))}
					</Stack>
				)}
			>
				{options.map((option: Option, index) => (
					<MenuItem key={index} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</Select>
		</Stack>
		<div className='table'>
			
			<div className='table-header-group'>
				<div className='table-cell'>111</div>
				<div className='table-cell'>222</div>
				<div className='table-cell'>333</div>
			</div>
			<div className='table-row-group'>
				<div className='table-cell'>a</div>
				<div className='table-cell'>b</div>
				<div className='table-cell'>c</div>
			</div>
			<div className='table-row'>
				<div className='table-cell'>d</div>
				<div className='table-cell'>e</div>
				<div className='table-cell'>f</div>
			</div>
			<div className='table-footer-group'>
				<div className='table-cell'>g</div>
				<div className='table-cell'>h</div>
				<div className='table-cell'>i</div>
			</div>
		</div>

		<table className="border border-collapse border-slate-400">
			<thead>
				<tr>
					<th className="border border-slate-300">State</th>
					<th className="border border-slate-300">City</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="border border-slate-300">Indiana</td>
					<td className="border border-slate-300">Indianapolis</td>
				</tr>
				<tr>
					<td className="border border-slate-300">Ohio</td>
					<td className="border border-slate-300">Columbus</td>
				</tr>
				<tr>
					<td className="border border-slate-300">Michigan</td>
					<td className="border border-slate-300">Detroit</td>
				</tr>
			</tbody>
		</table>
		<br />
		<br />
		<br />
		<br />
		<table className="border border-separate border-slate-400">
			<caption className="caption-top">
				Table 3.1: Professional wrestlers and their signature moves.
			</caption>
			<thead>
				<tr>
					<th className="border border-slate-300">State</th>
					<th className="border border-slate-300">City</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="border border-slate-300">Indiana</td>
					<td className="border border-slate-300">Indianapolis</td>
				</tr>
				<tr>
					<td className="border border-slate-300">Ohio</td>
					<td className="border border-slate-300">Columbus</td>
				</tr>
				<tr>
					<td className="border border-slate-300">Michigan</td>
					<td className="border border-slate-300">Detroit</td>
				</tr>
			</tbody>
		</table>
	</>
	);
}
