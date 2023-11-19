import { Characteristics } from '../config/constants';
import {
	setErrorPressure,
	setMaxPressure,
} from '../store/slices/pressure-manager-slice';
import {
	setErrorTemperature,
	setMaxTemperature,
	setMinTemperature,
	setTargetTemperature,
} from '../store/slices/temperature-manager-slice';
import {
	setErrorVolume,
	setMaxVolume,
	setMinVolume,
	setTargetVolume,
} from '../store/slices/volume-manager-slice';
import { IEditingConfig } from '../types/editing-config';
import { Formatter } from '../utils/formatter';
import { useAppDispatch, useAppSelector } from './redux';

export function useInputsForEditingForm(editingConfig: IEditingConfig) {
	const pressureManager = useAppSelector((state) => state.pressureManager);
	const temperatureManager = useAppSelector(
		(state) => state.temperatureManager
	);
	const volumeManager = useAppSelector((state) => state.volumeManager);

	const dispatch = useAppDispatch();

	let inputs;

	switch (editingConfig.typeValue) {
		case Characteristics.pressure:
			inputs = (
				<>
					<h1 className='text-center text-3xl font-bold mb-6'>Давление</h1>
					{editingConfig?.options.errorValue && (
						<div className='form-field'>
							<label>Погрешность измерений</label>
							<input
								type='number'
								value={pressureManager.errorValue}
								onChange={(e) =>
									dispatch(
										setErrorPressure(Formatter.stringToInt(e.target.value))
									)
								}
							/>
						</div>
					)}
					{editingConfig?.options.minValue && (
						<div className='form-field'>
							<label>Максимальное значение</label>
							<input
								type='number'
								value={pressureManager.maxValue}
								onChange={(e) =>
									dispatch(
										setMaxPressure(Formatter.stringToInt(e.target.value))
									)
								}
							/>
						</div>
					)}
				</>
			);
			break;

		case Characteristics.temperature:
			inputs = (
				<>
					<h1 className='text-center text-3xl font-bold mb-6'>Температура</h1>
					{editingConfig?.options.targetValue && (
						<div className='form-field'>
							<label>Целевое значение</label>: {temperatureManager.targetValue}
							<input
								type='range'
								min={temperatureManager.minValue}
								max={temperatureManager.maxValue}
								value={temperatureManager.targetValue}
								onChange={(e) =>
									dispatch(
										setTargetTemperature(Formatter.stringToInt(e.target.value))
									)
								}
							/>
						</div>
					)}
					{editingConfig?.options.errorValue && (
						<div className='form-field'>
							<label>Погрешность измерений</label>
							<input
								type='number'
								value={temperatureManager.errorValue}
								onChange={(e) =>
									dispatch(
										setErrorTemperature(Formatter.stringToInt(e.target.value))
									)
								}
							/>
						</div>
					)}
					{editingConfig?.options.minValue && (
						<div className='form-field'>
							<label>Минимальное значение</label>
							<input
								type='number'
								value={temperatureManager.minValue}
								onChange={(e) =>
									dispatch(
										setMinTemperature(Formatter.stringToInt(e.target.value))
									)
								}
							/>
						</div>
					)}
					{editingConfig?.options.maxValue && (
						<div className='form-field'>
							<label>Максимальное значение</label>
							<input
								type='number'
								value={temperatureManager.maxValue}
								onChange={(e) =>
									dispatch(
										setMaxTemperature(Formatter.stringToInt(e.target.value))
									)
								}
							/>
						</div>
					)}
				</>
			);
			break;

		case Characteristics.volume:
			inputs = (
				<>
					<h1 className='text-center text-3xl font-bold mb-6'>Объем</h1>
					{editingConfig?.options.targetValue && (
						<div className='form-field'>
							<label>Целевое значение</label>: {volumeManager.targetValue}
							<input
								type='range'
								min={volumeManager.minValue}
								max={volumeManager.maxValue}
								value={volumeManager.targetValue}
								onChange={(e) =>
									dispatch(
										setTargetVolume(Formatter.stringToInt(e.target.value))
									)
								}
							/>
						</div>
					)}
					{editingConfig?.options.errorValue && (
						<div className='form-field'>
							<label>Погрешность значения</label>
							<input
								type='number'
								value={volumeManager.errorValue}
								onChange={(e) =>
									dispatch(
										setErrorVolume(Formatter.stringToInt(e.target.value))
									)
								}
							/>
						</div>
					)}
					{editingConfig?.options.minValue && (
						<div className='form-field'>
							<label>Минимальное значение</label>
							<input
								type='number'
								value={volumeManager.minValue}
								onChange={(e) =>
									dispatch(setMinVolume(Formatter.stringToInt(e.target.value)))
								}
							/>
						</div>
					)}
					{editingConfig?.options.maxValue && (
						<div className='form-field'>
							<label>Максимальное значение</label>
							<input
								type='number'
								value={volumeManager.maxValue}
								onChange={(e) =>
									dispatch(setMaxVolume(Formatter.stringToInt(e.target.value)))
								}
							/>
						</div>
					)}
				</>
			);
			break;
	}

	return inputs;
}
