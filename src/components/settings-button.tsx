import { IEditingConfig } from '../types/editing-config';
import SettingsIcon from './icons/settings-icon';
import cn from 'classnames';

interface Props {
	onClick: (newConfig: IEditingConfig) => void;
	editingConfig: IEditingConfig;
	disabled?: boolean;
}

const SettingsButton: React.FC<Props> = ({
	onClick,
	editingConfig,
	disabled,
	...props
}) => {
	return (
		<button
			className={cn('settings-button', {
				'opacity-25': disabled,
				'cursor-auto': disabled,
			})}
			onClick={() => onClick(editingConfig)}
			{...props}
		>
			<SettingsIcon />
		</button>
	);
};

export default SettingsButton;
