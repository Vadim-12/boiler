import { NullableNumber } from './nullable-number';

export interface IBaseParameters {
	currentValue?: NullableNumber;
	targetValue?: NullableNumber;
	minValue?: NullableNumber;
	maxValue?: NullableNumber;
	errorValue?: NullableNumber;
}
