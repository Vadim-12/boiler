import { Characteristics } from '../config/constants';
import { IEditingConfig } from '../types/editing-config';
import SettingsButton from './settings-button';

interface Props {
	setEditingConfigAndOpenModalWindow: (
		newEditingConfig: IEditingConfig
	) => void;
}

const CharacteristicsEditingTable: React.FC<Props> = ({
	setEditingConfigAndOpenModalWindow,
}) => {
	return (
		<table className='characteristics-editing-table'>
			<thead>
				<tr>
					<th></th>
					<th>Объем</th>
					<th>Давление</th>
					<th>Температура</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Целевое значение</td>
					<td>
						<SettingsButton
							onClick={setEditingConfigAndOpenModalWindow}
							editingConfig={{
								typeValue: Characteristics.volume,
								options: {
									targetValue: 1,
								},
							}}
						/>
					</td>
					<td></td>
					<td>
						<SettingsButton
							onClick={setEditingConfigAndOpenModalWindow}
							editingConfig={{
								typeValue: Characteristics.temperature,
								options: {
									targetValue: 1,
								},
							}}
						/>
					</td>
				</tr>
				<tr>
					<td>Пограничные значения</td>
					<td>
						<SettingsButton
							onClick={setEditingConfigAndOpenModalWindow}
							editingConfig={{
								typeValue: Characteristics.volume,
								options: {
									minValue: 1,
									maxValue: 1,
								},
							}}
						/>
					</td>
					<td>
						<SettingsButton
							onClick={setEditingConfigAndOpenModalWindow}
							editingConfig={{
								typeValue: Characteristics.pressure,
								options: {
									minValue: 1,
									maxValue: 1,
								},
							}}
						/>
					</td>
					<td>
						<SettingsButton
							onClick={setEditingConfigAndOpenModalWindow}
							editingConfig={{
								typeValue: Characteristics.temperature,
								options: {
									minValue: 1,
									maxValue: 1,
								},
							}}
						/>
					</td>
				</tr>
				<tr>
					<td>Погрешность измерения</td>
					<td>
						<SettingsButton
							onClick={setEditingConfigAndOpenModalWindow}
							editingConfig={{
								typeValue: Characteristics.volume,
								options: {
									errorValue: 1,
								},
							}}
						/>
					</td>
					<td>
						<SettingsButton
							onClick={setEditingConfigAndOpenModalWindow}
							editingConfig={{
								typeValue: Characteristics.pressure,
								options: {
									errorValue: 1,
								},
							}}
						/>
					</td>
					<td>
						<SettingsButton
							onClick={setEditingConfigAndOpenModalWindow}
							editingConfig={{
								typeValue: Characteristics.temperature,
								options: {
									errorValue: 1,
								},
							}}
						/>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default CharacteristicsEditingTable;
