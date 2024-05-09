import { IconContext } from 'react-icons';

function WeatherHighlight({ icon, title, value }) {
	return (
		<div className="bg-gray-100 rounded-md p-4 grid grid-cols-12 gap-3 shadow-sm">
			<div className="col-span-4 flex items-center justify-center">
				<IconContext.Provider value={{ size: '2em' }}>
					<div>{icon}</div>
				</IconContext.Provider>
			</div>

			<div className="col-span-8 flex flex-col justify-start gap-1">
				<h3 className="text-xs text-gray-500 uppercase font-semibold">
					{title}
				</h3>
				<p className="text-md font-semibold">{value}</p>
			</div>
		</div>
	);
}
export default WeatherHighlight;
