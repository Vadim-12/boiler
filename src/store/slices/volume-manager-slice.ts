import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IVolumeManagerState } from '../../types/store/volume-manager';
import { NullableNumber } from '../../types/nullable-number';

const initialState: IVolumeManagerState = {
	currentValue: 0,
	targetValue: 10,
	errorValue: 0,
	minValue: 10,
	maxValue: 100,
};

const volumeManagerSlice = createSlice({
	name: 'volume-manager',
	initialState,
	reducers: {
		setCurrentVolume: (state, action: PayloadAction<NullableNumber>) => {
			state.currentValue = action.payload;
		},
		setTargetVolume: (state, action: PayloadAction<NullableNumber>) => {
			state.targetValue = action.payload;
		},
		setErrorVolume: (state, action: PayloadAction<NullableNumber>) => {
			state.errorValue = action.payload;
		},
		setMinVolume: (state, action: PayloadAction<NullableNumber>) => {
			state.minValue = action.payload;
		},
		setMaxVolume: (state, action: PayloadAction<NullableNumber>) => {
			state.maxValue = action.payload;
		},
	},
});

export { volumeManagerSlice };
export const {
	setCurrentVolume,
	setTargetVolume,
	setErrorVolume,
	setMinVolume,
	setMaxVolume,
} = volumeManagerSlice.actions;
