import { configureStore } from '@reduxjs/toolkit';
import { pressureManagerSlice } from './slices/pressure-manager-slice';
import { volumeManagerSlice } from './slices/volume-manager-slice';
import { temperatureManagerSlice } from './slices/temperature-manager-slice';

export const store = configureStore({
	reducer: {
		pressureManager: pressureManagerSlice.reducer,
		volumeManager: volumeManagerSlice.reducer,
		temperatureManager: temperatureManagerSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
