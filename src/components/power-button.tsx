import React, { useState } from 'react';
import EnabledButtonIcon from './icons/enabled-button-icon';
import DisabledButtonIcon from './icons/disabled-button-icon';

interface Props {
	isWorking: boolean;
	setIsWorking: React.Dispatch<React.SetStateAction<boolean>>;
}

const PowerButton: React.FC<Props> = ({ isWorking, setIsWorking }) => {
	const [isHover, setIsHover] = useState<boolean>(false);

	const hintText = `Котел ${isWorking ? 'включен' : 'выключен'}`;

	const hint = (
		<p className='absolute text-sm w-32 top-1/2 -translate-y-1/2 left-full text-slate-500'>
			{hintText}
		</p>
	);

	return (
		<button
			className='block w-10 h-10 mx-auto relative'
			onClick={() => setIsWorking((prev) => !prev)}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			{isWorking ? <EnabledButtonIcon /> : <DisabledButtonIcon />}
			{isHover && hint}
		</button>
	);
};

export default PowerButton;
