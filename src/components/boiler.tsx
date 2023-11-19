import { useEffect, useRef, useState } from 'react';
import { Converter } from '../utils/converter';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { NullableNumber } from '../types/nullable-number';
import { setCurrentVolume } from '../store/slices/volume-manager-slice';
import { setCurrentTemperature } from '../store/slices/temperature-manager-slice';
import { getColorByTemperature } from '../utils/get-color-by-temperature';

interface Props {
	isWorking: boolean;
}

const Boiler: React.FC<Props> = ({ isWorking }) => {
	const dispatch = useAppDispatch();
	const volumeManager = useAppSelector((state) => state.volumeManager);
	const temperatureManager = useAppSelector(
		(state) => state.temperatureManager
	);

	const [currentVolume, setCurrentVolumeLocal] = useState<
		NullableNumber | undefined
	>(volumeManager.currentValue);
	const [isVolumeOk, setIsVolumeOk] = useState<boolean | undefined>(false);
	const [currentTemperature, setCurrentTemperatureLocal] = useState<
		NullableNumber | undefined
	>(temperatureManager.currentValue);
	const [isTemperatureOk, setIsTemperatureOk] = useState<boolean>(false);

	const waterRef = useRef<HTMLDivElement>(null);
	const boilerRegulingVolumeRef = useRef<NodeJS.Timer>();
	const boilerRegulingTemperatureRef = useRef<NodeJS.Timer>();
	const boilerDrainingRef = useRef<NodeJS.Timer>();

	// слив воды по выключению котла
	useEffect(() => {
		if (!isWorking) {
			boilerDrainingRef.current = setInterval(drainBoiler, 100);
		} else {
			clearInterval(boilerDrainingRef.current);
		}
	}, [isWorking]);

	// изменение стора при изменении объема в локальном стейте
	useEffect(() => {
		const isVolumeOk =
			+currentVolume! >=
				+volumeManager.targetValue! - +volumeManager.errorValue! &&
			+currentVolume! <=
				+volumeManager.targetValue! + +volumeManager.errorValue!;
		setIsVolumeOk(isVolumeOk);
		dispatch(setCurrentVolume(currentVolume!));
	}, [currentVolume]);

	// изменение стора при изменении температуры в локальном стейте
	useEffect(() => {
		dispatch(setCurrentTemperature(currentTemperature!));
	}, [currentTemperature]);

	// обновлять UI по объему воды
	useEffect(() => {
		if (waterRef.current) {
			waterRef.current.style.height = `${Converter.getPercentFromValue(
				+currentVolume!,
				+volumeManager.maxValue!
			)}%`;
		}
	}, [currentVolume, volumeManager.maxValue]);

	// вкл/выкл регулировки объема воды
	useEffect(() => {
		if (isWorking && !isVolumeOk) {
			boilerRegulingVolumeRef.current = setInterval(regulateVolume, 100);
		} else {
			stopRegulingVolume();
		}
	}, [isWorking, isVolumeOk]);

	// обновлять UI (цвет воды) по температуре воды
	useEffect(() => {
		if (waterRef.current && isVolumeOk) {
			waterRef.current.style.background = getColorByTemperature(
				+currentTemperature!
			);
		}
	}, [currentTemperature]);

	// вкл/выкл регулировки температуры воды
	useEffect(() => {
		if (isVolumeOk && isWorking) {
			if (!isTemperatureOk) {
				boilerRegulingTemperatureRef.current = setInterval(
					regulateTemperature,
					100
				);
			} else {
				stopRegulingTemperature();
			}
		}
	}, [isVolumeOk, isWorking, isTemperatureOk]);

	function drainBoiler() {
		setCurrentVolumeLocal((prevVolume) =>
			+prevVolume! > 0 ? +prevVolume! - 1 : prevVolume
		);
	}

	// функция остановки регулировки объема воды
	function stopRegulingVolume() {
		clearInterval(boilerRegulingVolumeRef.current);
	}

	// функция регулировки объема воды
	const regulateVolume = async () => {
		setCurrentVolumeLocal((prevVolume) => {
			const needsIncreaseVolume =
				+prevVolume! < +volumeManager.targetValue! - +volumeManager.errorValue!;
			const needsDecreaseVolume =
				+prevVolume! > +volumeManager.targetValue! + +volumeManager.errorValue!;

			let updatedVolume;
			if (needsIncreaseVolume) {
				updatedVolume = +prevVolume! + 1;
			} else if (needsDecreaseVolume) {
				updatedVolume = +prevVolume! - 1;
			} else {
				stopRegulingVolume();
				setIsVolumeOk(true);
				return prevVolume;
			}
			return updatedVolume;
		});
	};

	// функция остановки регулировки температуры воды
	function stopRegulingTemperature() {
		clearInterval(boilerRegulingTemperatureRef.current);
	}

	// функция регулировки температуры воды
	const regulateTemperature = () => {
		setCurrentTemperatureLocal((prevTemperature) => {
			const needsIncreaseTemperature =
				+prevTemperature! <
				+temperatureManager.targetValue! - +temperatureManager.errorValue!;
			const needsDecreaseTemperature =
				+prevTemperature! >
				+temperatureManager.targetValue! + +temperatureManager.errorValue!;

			let updatedTemperature;
			if (needsIncreaseTemperature) {
				updatedTemperature = +prevTemperature! + 1;
			} else if (needsDecreaseTemperature) {
				updatedTemperature = +prevTemperature! - 1;
			} else {
				stopRegulingTemperature();
				setIsTemperatureOk(true);
				return prevTemperature;
			}
			return updatedTemperature;
		});
	};

	return (
		<div className='w-1/3 h-3/4 bg-slate-200 border-4 border-cyan-950 mx-auto relative'>
			<div ref={waterRef} className='absolute bottom-0 w-full bg-sky-500' />
			<p>
				{currentVolume} л {isVolumeOk ? 'good' : 'bad'}
			</p>
			<p>
				{currentTemperature} ℃ {isTemperatureOk ? 'good' : 'bad'}
			</p>
		</div>
	);
};

export default Boiler;
