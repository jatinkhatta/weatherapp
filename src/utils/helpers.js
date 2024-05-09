import { DateTime } from 'luxon';

export function getFormattedUnits(units) {
	if (units === 'metric') {
		return '°C'; // Celsius
	} else if (units === 'imperial') {
		return '°F'; // Fahrenheit
	} else {
		return 'K'; // Kelvin or other units
	}
}

export function formatTime(timeStamp, timeOffset) {
	return DateTime.fromSeconds(timeStamp)
		.setZone('GMT')
		.plus({ seconds: timeOffset })
		.toFormat('hh:mm a');
}
