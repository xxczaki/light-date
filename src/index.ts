export const format = (date: Date, exp: string): string => exp.replace(/{.*?}/g, key => {
	switch (key) {
		case '{yyyy}':
			return `${date.getFullYear()}`;
		case '{yy}':
			return `${date.getFullYear()}`.slice(-2);
		case '{MM}': {
			const month = date.getMonth() + 1;
			return month < 10 ? `0${month}` : `${month}`;
		}

		case '{dd}': {
			const day = date.getDate();
			return day < 10 ? `0${day}` : `${day}`;
		}

		case '{HH}': {
			const hours = date.getHours();
			return hours < 10 ? `0${hours}` : `${hours}`;
		}

		case '{mm}': {
			const minutes = date.getMinutes();
			return minutes < 10 ? `0${minutes}` : `${minutes}`;
		}

		case '{ss}': {
			const seconds = date.getSeconds();
			return seconds < 10 ? `0${seconds}` : `${seconds}`;
		}

		case '{SSS}':
			return `${date.getMilliseconds()}`.padStart(3, '0');

		/* c8 ignore next 2 */
		default:
			return '';
	}
});
