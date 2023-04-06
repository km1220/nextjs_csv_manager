import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
// import { HYDRATE } from 'next-redux-wrapper';

interface CounterState {
	loading: boolean;
}

const initialState: CounterState = {
	loading: false,
};

export const settingSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.loading = true;
		},
		endLoading: (state) => {
			state.loading = false;
		},
	},
	// extraReducers: (builder) => {
	// 	builder.addCase(HYDRATE, (state, action: PayloadAction<CounterState> | AnyAction) => {
	// 		return { ...state, ...action.payload.settings }
	// 	})
	// }
});

export const { setLoading, endLoading } = settingSlice.actions;

export default settingSlice.reducer;
