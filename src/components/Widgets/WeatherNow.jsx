import { HiArrowUp, HiArrowDown } from 'react-icons/hi2';
import { useWeather } from '../../context/WeatherContext';
import { DateTime } from 'luxon';
import FormattedTemperature from '../FormattedTemperature';
import { BASE_ICON_URL } from '../../config/config';
import Loader from '../Loader';

function WeatherNow() {
	// Node, ADD Dynamic Color to this parent if possible based on weather conditions

	const { city, weatherData, isLoadingCurrent } = useWeather();

	return (
		<div className="bg-gradient-to-br from-sky-500 to-indigo-500 min-h-[20rem] rounded-lg px-4 py-8 shadow-md text-white flex flex-col justify-center">
			{isLoadingCurrent && <Loader />}
			{!isLoadingCurrent && (
				<>
					<div className="flex gap-1 flex-col text-center">
						<p className="text-2xl font-bold">
							{city.name}, {city.countryCode}
						</p>
						<p className="text-sm">
							Local Time:{' '}
							{DateTime.now()
								.setZone('GMT')
								.plus({ seconds: city.timezone })
								.toLocaleString(DateTime.TIME_SIMPLE)}{' '}
						</p>
					</div>

					<div className="grid grid-cols-8 items-center py-4">
						<div className="col-span-3 flex flex-col items-center justify-center">
							<img
								className="w-24 h-24"
								src={`${BASE_ICON_URL}${weatherData.icon}@2x.png`}
								alt=""
							/>
							<p className="-mt-2">{weatherData.main}</p>
						</div>

						<div className="col-span-5 flex flex-col gap-4 mt-6 items-center justify-center">
							<p className="text-4xl tracking-wide">
								<FormattedTemperature temp={weatherData.temp} />
							</p>

							<div className="flex gap-4">
								<p className="flex items-center justify-center gap-1">
									<HiArrowUp />{' '}
									<FormattedTemperature temp={weatherData.maxTemp} />
								</p>
								<p className="flex items-center justify-center gap-1">
									<HiArrowDown />{' '}
									<FormattedTemperature temp={weatherData.minTemp} />
								</p>
							</div>
						</div>
						{/* <p className="w-20">☀️</p> */}
					</div>
				</>
			)}
		</div>
	);
}
export default WeatherNow;
