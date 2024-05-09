import { useWeather } from '../context/WeatherContext';
import { getFormattedUnits } from '../utils/helpers';

function FormattedTemperature({ temp }) {
	const { units } = useWeather();

	let formattedTemp = temp; // Default to the provided temperature

	if (units === 'imperial') {
		// If units are imperial, convert from Celsius to Fahrenheit
		formattedTemp = (temp * 9) / 5 + 32;
	}

	return (
		<>
			<span className="font-bold">
				{Math.round(formattedTemp)}
				{` `}
			</span>
			{getFormattedUnits(units)}
		</>
	);
}
export default FormattedTemperature;
