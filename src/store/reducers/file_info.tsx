import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
// import { HYDRATE } from 'next-redux-wrapper';

interface FileInfoState {
	file_data: File | undefined;
	json: object[],
}

const initialState: FileInfoState = {
	file_data: undefined,
	json: [],
};

export const fileSlice = createSlice({
	name: 'selected_csv_file',
	initialState,
	reducers: {
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

export const { setFile, resetFile, setJSONData, resetJSONData } = fileSlice.actions;

export default fileSlice.reducer;
