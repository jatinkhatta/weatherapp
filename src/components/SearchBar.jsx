import { useState } from 'react';
import { HiMapPin } from 'react-icons/hi2';
import {
	getCurrentLocation,
	getLocationCoords,
} from '../services/apiGeocoding';

import { useWeather } from '../context/WeatherContext';
import { getResults } from '../services/apiWeather';

function SearchBar() {
	const [query, setQuery] = useState('');
	const { dispatch } = useWeather();

	async function fetchData(lat, lon) {
		try {
			dispatch({ type: `fetch/current` });
			dispatch({ type: `fetch/weekly` });

			const { resultCurrent, resultWeekly } = await getResults(lat, lon);

			dispatch({ type: `dataReceived/current`, payload: resultCurrent });
			dispatch({ type: `dataReceived/weekly`, payload: resultWeekly });
		} catch (error) {
			console.error('Error:', error.message);
			// Handle the error, e.g., dispatch an error action or show an error message to the user.
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const [lat, lon] = await getLocationCoords(query);
			console.log('returning value', lat, lon);
			await fetchData(lat, lon);
		} catch (error) {
			console.error('Error:', error.message);
			// Handle the error, e.g., dispatch an error action or show an error message to the user.
		}
	}

	async function handleLocationEnable() {
		try {
			const { lat, lon } = await getCurrentLocation();
			await fetchData(lat, lon);
		} catch (error) {
			console.error('Error:', error.message);
			// Handle the error, e.g., dispatch an error action or show an error message to the user.
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					placeholder="Search location..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="w-44 rounded-full bg-slate-100 px-4 py-2 text-xs transition-all duration-300 placeholder:text-slate-400 outline-none focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
				/>
			</form>
			<button
				type="button"
				onClick={() => handleLocationEnable()}
				className="p-1 rounded-full bg-slate-100 transition-all duration-300 outline-none focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 "
			>
				<HiMapPin className="h-5 w-5 fill-slate-700" />
			</button>
		</>
	);
}
export default SearchBar;
