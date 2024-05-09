import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import WeatherHighlight from '../WeatherHighlight';
import { FiWind } from 'react-icons/fi';
import { WiHumidity } from 'react-icons/wi';
import { PiWavesLight } from 'react-icons/pi';
import { LiaTemperatureLowSolid } from 'react-icons/lia';
import { useWeather } from '../../context/WeatherContext';
import { formatTime } from '../../utils/helpers';
import FormattedTemperature from '../FormattedTemperature';
import FormattedSpeed from '../FormattedSpeed';
import Loader from '../Loader';

function WeatherHighlights() {
	// Future Plan: Can map over the items and set their values dynamically using an object, rather than doing it statically.
	const { city, weatherData, isLoadingCurrent } = useWeather();

	return (
		<div className="row-start-2 col-start-1 min-h-[16rem] flex flex-col">
			<h2 className="font-bold mb-2">Today&apos;s Highlights</h2>

			{isLoadingCurrent && (
				<div className="flex-grow flex justify-center items-center">
					<Loader />
				</div>
			)}
			{!isLoadingCurrent && (
				<>
					<div className="grid grid-cols-2 gap-4">
						<WeatherHighlight
							icon={<HiOutlineSun />}
							title={'Sunrise'}
							value={formatTime(weatherData.sunrise, city.timezone)}
						/>

						<WeatherHighlight
							icon={<HiOutlineMoon />}
							title={'Sunset'}
							value={formatTime(weatherData.sunset, city.timezone)}
						/>

						<WeatherHighlight
							icon={<FiWind />}
							title={'Wind'}
							value={<FormattedSpeed speed={weatherData.wind} />}
						/>

						<WeatherHighlight
							icon={<WiHumidity />}
							title={'Humidity'}
							value={`${weatherData.humidity} %`}
						/>

						<WeatherHighlight
							icon={<LiaTemperatureLowSolid />}
							title={'Feels Like'}
							value={<FormattedTemperature temp={weatherData.feelsLike} />}
						/>

						<WeatherHighlight
							icon={<PiWavesLight />}
							title={'Pressure'}
							value={`${weatherData.pressure} hPa`}
						/>
					</div>
				</>
			)}
		</div>
	);
}
export default WeatherHighlights;
