import { createContext, useContext, useReducer } from 'react';

const WeatherContext = createContext();

const initialState = {
	units: 'metric', // Can be 'metric' or 'imperial'
	city: {
		name: ``,
		countryCode: '',
		coord: {
			lat: 0,
			lon: 0,
		},
		timezone: 0,
	},

	weatherData: {
		date: 0,
		main: '',
		icon: '10d',
		temp: 0,

		maxTemp: 0,
		minTemp: 0,
		feelsLike: 0,
		pressure: 0,
		humidity: 0,
		sunrise: 0,
		sunset: 0,
		wind: 0,
	},

	weeklyData: [
		{
			index: 0,
			date: 0,
			temp: 0,
			main: ``,
			icon: `10d`,

			maxTemp: 0,
			minTemp: 0,
			pressure: 0,
			humidity: 0,
		},
	],
	errorCurrent: null,
	errorWeekly: null,
	isLoadingCurrent: false,
	isLoadingWeekly: false,
};

function reducer(state, action) {
	switch (action.type) {
		case `changeUnits`:
			return {
				...state,
				units: action.payload,
			};

		case `fetch/current`:
			return {
				...state,
				isLoadingCurrent: true,
			};

		case `fetch/weekly`:
			return {
				...state,
				isLoadingWeekly: true,
			};

		case 'dataFailed/current':
			return {
				...state,
				isLoadingCurrent: false,
				errorCurrent: action.payload,
			};

		case 'dataFailed/weekly':
			return {
				...state,
				isLoadingWeekly: false,
				errorWeekly: action.payload,
			};

		case 'dataReceived/current':
			console.log(action.payload.weather[0].main);

			return {
				...state,
				isLoadingCurrent: false,
				...transformCurrentWeatherData(action.payload),
			};

		case 'dataReceived/weekly':
			return {
				...state,
				isLoadingWeekly: false,
				weeklyData: transformWeeklyData(action.payload),
			};
	}
}

function transformCurrentWeatherData(data) {
	return {
		city: {
			name: data.name,
			countryCode: data.sys.country,
			coords: data.coord,
			timezone: Number(data.timezone),
		},
		weatherData: {
			main: data.weather[0].main,
			icon: data.weather[0].icon,
			temp: data.main.temp,

			maxTemp: data.main.temp_max,
			minTemp: data.main.temp_min,
			feelsLike: data.main.feels_like,
			pressure: data.main.pressure,
			humidity: data.main.humidity,
			sunrise: data.sys.sunrise,
			sunset: data.sys.sunset,
			wind: data.wind.speed,
		},
	};
}

function transformWeeklyData(data) {
	const transformedData = data.list.map((item, index) => ({
		index,
		date: item.dt,
		temp: item.main.temp,
		main: item.weather[0].main,
		icon: item.weather[0].icon,

		maxTemp: item.main.temp_max,
		minTemp: item.main.temp_min,
		pressure: item.main.pressure,
		humidity: item.main.humidity,
	}));

	return transformedData;
}
/* eslint-disable react/prop-types */

function WeatherProvider({ children }) {
	const [
		{
			units,
			city,
			weatherData,
			weeklyData,
			errorCurrent,
			errorWeekly,
			isLoadingCurrent,
			isLoadingWeekly,
		},
		dispatch,
	] = useReducer(reducer, initialState);

	return (
		<WeatherContext.Provider
			value={{
				units,
				city,
				weatherData,
				weeklyData,
				errorCurrent,
				errorWeekly,
				isLoadingCurrent,
				isLoadingWeekly,
				dispatch,
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
}

function useWeather() {
	const context = useContext(WeatherContext);
	if (context === undefined)
		throw new Error('WeatherContext was used outside of the WeatherProvider');

	return context;
}

export { WeatherProvider, useWeather };
