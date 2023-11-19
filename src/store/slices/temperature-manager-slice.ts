import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITemperatureManagerState } from '../../types/store/temperature-manager';
import { NullableNumber } from '../../types/nullable-number';
import { WATER_TEMPERATURE_FROM_TANK } from '../../config/constants';

const initialState: ITemperatureManagerState = {
	currentValue: WATER_TEMPERATURE_FROM_TANK,
	targetValue: 10,
	errorValue: 0,
	minValue: 10,
	maxValue: 90,
};

const temperatureManagerSlice = createSlice({
	name: 'temperature-manager',
	initialState,
	reducers: {
		setCurrentTemperature: (state, action: PayloadAction<NullableNumber>) => {
			state.currentValue = action.payload;
		},
		setTargetTemperature: (state, action: PayloadAction<NullableNumber>) => {
			state.targetValue = action.payload;
		},
		setErrorTemperature: (state, action: PayloadAction<NullableNumber>) => {
			state.errorValue = action.payload;
		},
		setMinTemperature: (state, action: PayloadAction<NullableNumber>) => {
			state.minValue = action.payload;
		},
		setMaxTemperature: (state, action: PayloadAction<NullableNumber>) => {
			state.maxValue = action.payload;
		},
	},
});

export { temperatureManagerSlice };
export const {
	setCurrentTemperature,
	setTargetTemperature,
	setErrorTemperature,
	setMinTemperature,
	setMaxTemperature,
} = temperatureManagerSlice.actions;
