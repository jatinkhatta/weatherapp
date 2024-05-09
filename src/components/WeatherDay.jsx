import { HiArrowDown, HiArrowUp } from 'react-icons/hi2';
import FormattedTemperature from './FormattedTemperature';
import { useWeather } from '../context/WeatherContext';
import { DateTime } from 'luxon';

function WeatherDay({ index = 0 }) {
	const { weeklyData } = useWeather();

	return (
		<div className="flex items-center justify-between p-2">
			<img
				className="w-12 h-12"
				src="https://openweathermap.org/img/wn/10d@2x.png"
				alt=""
			/>
			<p className="text-sm">{weeklyData[index].main}</p>

			<p className="text-lg tracking-wide">
				<FormattedTemperature temp={weeklyData[index].temp} />
			</p>

			<div className="text-xs flex flex-col gap-1">
				<p className="flex items-center justify-center gap-1">
					<HiArrowUp />{' '}
					<FormattedTemperature temp={weeklyData[index].maxTemp} />
				</p>
				<p className="flex items-center justify-center gap-1">
					<HiArrowDown />{' '}
					<FormattedTemperature temp={weeklyData[index].minTemp} />
				</p>
			</div>

			<p className="text-md ">
				{DateTime.fromSeconds(weeklyData[index].date).toFormat('LLL dd')}
			</p>
		</div>
	);
}
export default WeatherDay;
