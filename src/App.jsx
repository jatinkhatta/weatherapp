import MainGrid from './components/MainGrid';
import Header from './components/Header';
import { useEffect } from 'react';
import { useWeather } from './context/WeatherContext';
import { getResults } from './services/apiWeather';

function App() {
	const { dispatch } = useWeather();

	useEffect(function () {
		async function fetchInitialData(lat, lon) {
			try {
				dispatch({ type: 'fetch/current' });
				dispatch({ type: 'fetch/weekly' });

				const { resultCurrent, resultWeekly } = await getResults(lat, lon);

				dispatch({ type: 'dataReceived/current', payload: resultCurrent });
				dispatch({ type: 'dataReceived/weekly', payload: resultWeekly });
			} catch (error) {
				console.error('Error:', error.message);
				// Handle the error, e.g., dispatch an error action or show an error message to the user.
			}
		}
		fetchInitialData(30.3255646, 78.0436813);
		// Coordinates for Dehradun, for initialization only. NOTE to self: move function in a seperate file and call init() function

		// Should run only on component mount
	}, []);

	return (
		<div className="grid h-screen grid-rows-[auto_1fr] bg-gray-50 text-gray-700">
			<Header />

			<main className="overflow-scroll px-4 py-8 ">
				<MainGrid />
			</main>
		</div>
	);
}
export default App;
