import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPressureManagerState } from '../../types/store/pressure-manager';
import { NullableNumber } from '../../types/nullable-number';

const initialState: IPressureManagerState = {
	currentValue: 0,
	errorValue: 0,
	maxValue: 1000,
};

const pressureManagerSlice = createSlice({
	name: 'pressure-manager',
	initialState,
	reducers: {
		setCurrentPressure: (state, action: PayloadAction<NullableNumber>) => {
			state.currentValue = action.payload;
		},
		setErrorPressure: (state, action: PayloadAction<NullableNumber>) => {
			state.errorValue = action.payload;
		},
		setMaxPressure: (state, action: PayloadAction<NullableNumber>) => {
			state.maxValue = action.payload;
		},
	},
});

export { pressureManagerSlice };
export const { setCurrentPressure, setErrorPressure, setMaxPressure } =
	pressureManagerSlice.actions;
