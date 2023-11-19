export class Converter {
	static getPercentFromValue(value: number, maxValue: number) {
		return (value / maxValue) * 100;
	}
}
