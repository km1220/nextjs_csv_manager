import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
// import { HYDRATE } from 'next-redux-wrapper';
import { WorkBook, WorkSheet } from 'xlsx';

interface FileInfoState {
	file_data: File | undefined;
	workbook: WorkBook | undefined,
	worksheet: WorkSheet | undefined,
	json: object[],
}

const initialState: FileInfoState = {
	file_data: undefined,
	workbook: undefined,
	worksheet: undefined,
	json: [],
};

export const fileSlice = createSlice({
	name: 'selected_csv_file',
	initialState,
	reducers: {
		set: (state, action: PayloadAction<any>) => {
			state = { ...state, ...action.payload };
		},
		reset: (state) => {
			state = initialState;
		},
		setFile: (state, action: PayloadAction<File>) => {
			state.file_data = action.payload;
		},
		resetFile: (state) => {
			state.file_data = initialState.file_data;
		},
		setJSONData: (state, action: PayloadAction<object[]>) => {
			state.json = action.payload;
		},
		resetJSONData: (state) => {
			state.json = initialState.json;
		},
	},
	// extraReducers: (builder) => {
	// 	builder.addCase(HYDRATE, (state, action: PayloadAction<FileInfoState> | AnyAction) => {
	// 		return { ...state, ...action.payload.selected_csv_file }
	// 	})
	// }
});

export const { set, reset, setFile, resetFile, setJSONData, resetJSONData } = fileSlice.actions;

export default fileSlice.reducer;
