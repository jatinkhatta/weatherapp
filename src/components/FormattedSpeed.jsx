import { useWeather } from '../context/WeatherContext';

function FormattedSpeed({ speed }) {
	const { units } = useWeather();

	let formattedSpeed = speed; // Default to the provided temperature

	if (units === 'imperial') {
		// If units are imperial, convert wind speed from m/s to mph
		formattedSpeed = speed / 1.60934; // 1 Kmph ≈ 0.621371 Mph;
	}

	return (
		<>
			<span className="font-bold">{Math.round(formattedSpeed)} </span>
			{units === 'imperial' ? 'mph' : 'kmph'}
		</>
	);
}
export default FormattedSpeed;
