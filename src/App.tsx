import React, { useEffect, useRef, useState } from 'react';
import PowerButton from './components/power-button';
import Boiler from './components/boiler';
import EditingModalWindow from './components/modal-windows/editing-modal-window';
import { Characteristics } from './config/constants';
import { IEditingConfig } from './types/editing-config';
import CharacteristicsEditingTable from './components/characteristics-editing-table';
import AlertModalWindow from './components/modal-windows/alert-modal-window';

const App: React.FC = () => {
	const [isWorking, setIsWorking] = useState<boolean>(false);
	const [isEditingActive, setIsEditingActive] = useState<boolean>(true);
	const isVolumeInitedRef = useRef<boolean>(false);
	const isPressureInitedRef = useRef<boolean>(false);
	const isTemperatureInitedRef = useRef<boolean>(false);
	const valueToBecomeInitedRef =
		useRef<React.MutableRefObject<boolean>>(isVolumeInitedRef);
	const [editingConfig, setEditingConfig] = useState<IEditingConfig>({
		typeValue: Characteristics.pressure,
		options: {},
	});
	const [, setRerender] = useState<boolean>(false);
	const [isAlertShown, setIsAlertShown] = useState<boolean>(false);

	useEffect(() => {
		setEditingConfigAndOpenModalWindow({
			typeValue: Characteristics.volume,
			options: {
				targetValue: 1,
				minValue: 1,
				maxValue: 1,
				errorValue: 1,
			},
		});
	}, []);

	useEffect(() => {
		if (isVolumeInitedRef.current) {
			showAlert(2000);
		}
	}, [isVolumeInitedRef.current]);

	function showAlert(timeMs = 1000) {
		setIsAlertShown(true);
		setTimeout(() => setIsAlertShown(false), timeMs);
	}

	function setEditingConfigAndOpenModalWindow(
		newEditingConfig: IEditingConfig
	) {
		setEditingConfig(newEditingConfig);
		setIsEditingActive(true);
	}

	return isAlertShown ? (
		<AlertModalWindow text='Можно включать котел' />
	) : isEditingActive ? (
		<EditingModalWindow
			setIsEditingActive={setIsEditingActive}
			editingConfig={editingConfig}
			valueToBecomeInitedRef={valueToBecomeInitedRef}
			setRerender={setRerender}
		/>
	) : (
		<div className='text-xl h-screen bg-slate-100 py-4'>
			<PowerButton isWorking={isWorking} setIsWorking={setIsWorking} />
			<div className='flex justify-between h-[800px]'>
				<div className='w-1/2 h-full'>
					<h2 className='text-3xl font-bold text-center mb-6'>Котел</h2>
					<Boiler isWorking={isWorking} />
				</div>
				<div className='w-[45%] mr-[5%]'>
					<h2 className='text-center text-3xl font-bold mb-6'>
						Характеристики
					</h2>
					<CharacteristicsEditingTable
						setEditingConfigAndOpenModalWindow={
							setEditingConfigAndOpenModalWindow
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default App;
