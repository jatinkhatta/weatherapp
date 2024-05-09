import { FORECAST_STEP } from '../../config/config';
import { useWeather } from '../../context/WeatherContext';
import Loader from '../Loader';
import WeatherDay from '../WeatherDay';

function WeatherDays() {
	const { weeklyData, isLoadingWeekly } = useWeather();

	return (
		<div className="">
			{/* row-start-1 col-start-2 row-span-2 */}

			<h2 className="font-bold mb-2">5 days Forecast</h2>
			<div className="bg-white flex flex-col gap-2 shadow-md rounded-lg min-h-[20rem]">
				{isLoadingWeekly && (
					<div className="flex-grow flex justify-center items-center">
						<Loader />
					</div>
				)}
				{!isLoadingWeekly && (
					<>
						<div className="grid grid-rows-5 gap-1 overflow-hidden">
							{weeklyData.map(
								(item, i) =>
									i % FORECAST_STEP === 0 && (
										<WeatherDay index={i} key={item.date} />
									)
							)}
							{/* API provides 8 values per day( at 3 hour intervals) */}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
export default WeatherDays;
