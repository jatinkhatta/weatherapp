import axios from 'axios';
import { BASE_URL } from '../config/config';
const API_KEY = import.meta.env.VITE_API_KEY;

// /weather : returns current weather data
// /forecast : return 5 day forecast, comes for every 3 hours (8 array items/day)

// `https://openweathermap.org/img/wn/10d@2x.png`;

// URL Structure
// 'api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}';

export async function getResultsFromCurrentLocation({ lat, lon }, type) {
	try {
		const response = await axios.get(`${BASE_URL}/${type}`, {
			params: {
				lat,
				lon,
				appid: API_KEY, // API key
				units: `metric`,
			},
		});

		if (response.status === 200) {
			const locationData = response.data;

			return locationData;
		} else {
			throw new Error('Failed to fetch location data');
		}
	} catch (error) {
		console.error('Error:', error.message);
		throw new Error(error.message);
	}
}

export async function getResults(lat, lon, units) {
	const resultCurrent = await getResultsFromCurrentLocation(
		{ lat, lon },
		`weather`,
		units
	);
	const resultWeekly = await getResultsFromCurrentLocation(
		{ lat, lon },
		`forecast`,
		units
	);
	return { resultCurrent, resultWeekly };
}
