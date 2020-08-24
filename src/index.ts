export const format = (date: Date, exp: string): string => exp.replace(/{(.*?)}/g, key => {
	switch (key) {
		case '{yyyy}':
			return `${date.getFullYear()}`;

		case '{yy}':
			return `${date.getFullYear()}`.slice(-2);

		case '{MM}':
			return (date.getMonth() + 1).toString().padStart(2, '0');

		case '{dd}':
			return date.getDate().toString().padStart(2, '0');

		case '{HH}':
			return date.getHours().toString().padStart(2, '0');

		case '{mm}':
			return date.getMinutes().toString().padStart(2, '0');

		case '{ss}':
			return date.getSeconds().toString().padStart(2, '0');

		case '{SSS}':
			return `${date.getMilliseconds()}`.padStart(3, '0');

		/* c8 ignore next 2 */
		default:
			return '';
	}
});
