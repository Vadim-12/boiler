export function getColorByTemperature(temperature: number) {
	if (temperature < 10) {
		return '#2A3AFF';
	} else if (temperature < 20) {
		return '#3C74FE';
	} else if (temperature < 30) {
		return '#3C85FE';
	} else if (temperature < 40) {
		return '#3C9AFE';
	} else if (temperature < 50) {
		return '#3CB2FE';
	} else if (temperature < 60) {
		return '#3CCCFE';
	} else if (temperature < 70) {
		return '#3CECFE';
	} else if (temperature < 80) {
		return '#FEA63C';
	} else if (temperature < 90) {
		return '#FE7A3C';
	} else if (temperature < 100) {
		return '#FE3C3C';
	}
	throw new Error('Temperature water is not valid');
}
