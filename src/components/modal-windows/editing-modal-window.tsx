import React, { useEffect } from 'react';
import { IEditingConfig } from '../../types/editing-config';
import { useInputsForEditingForm } from '../../hooks/use-inputs-for-editing-form';

interface Props {
	setIsEditingActive: React.Dispatch<React.SetStateAction<boolean>>;
	editingConfig: IEditingConfig;
	valueToBecomeInitedRef: React.MutableRefObject<
		React.MutableRefObject<boolean>
	>;
	setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditingModalWindow: React.FC<Props> = ({
	setIsEditingActive,
	editingConfig,
	valueToBecomeInitedRef,
	setRerender,
}) => {
	const formInputs = useInputsForEditingForm(editingConfig);

	useEffect(() => {
		return () => {
			valueToBecomeInitedRef.current.current = true;
			setRerender((prev) => !prev);
		};
	}, []);

	function handleSetValues(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsEditingActive(false);
	}

	return (
		<div className='modal-window-wrapper'>
			<form className='modal-window-form' onSubmit={handleSetValues}>
				{formInputs}
				<div className='w-flul flex justify-around'>
					<button className='button border-green-500' type='submit'>
						Готово
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditingModalWindow;
