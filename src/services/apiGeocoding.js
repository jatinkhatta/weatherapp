import axios from 'axios';
import { BASE_URL_GEOCODING } from '../config/config';
const API_KEY = import.meta.env.VITE_API_KEY;

export async function getCurrentLocation() {
	try {
		const positionObj = await new Promise(function (resolve, reject) {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});

		const position = {
			lat: positionObj.coords.latitude,
			lon: positionObj.coords.longitude,
		};

		return position;
	} catch (error) {
		// Handle geolocation error
		console.log(error);
		// throw new Error(`You need to enable browser location`);
	}
}

export async function getLocationCoords(query) {
	// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
	try {
		const response = await axios.get(`${BASE_URL_GEOCODING}`, {
			params: {
				q: query,
				appid: API_KEY, // API key
			},
		});
		if (response.status === 200) {
			const locationData = response.data;
			console.log(locationData[0].lat, locationData[0].lon);

			return [locationData[0].lat, locationData[0].lon];
		} else {
			throw new Error('Failed to fetch location data');
		}
	} catch (error) {
		console.error('Error:', error.message);
		throw new Error(error.message);
	}
}
