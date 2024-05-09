import { DateTime } from 'luxon';

function TimeAndDate() {
	return (
		<div>
			<h1 className="font-bold text-lg">
				{DateTime.now().toFormat('EEEE, LLL dd, yyyy')}
			</h1>
		</div>
	);
}
export default TimeAndDate;
