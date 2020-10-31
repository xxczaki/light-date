/**
 * Use this API for simple, most common formatting.
 *
 * @param {Date}  date - Date object, which should be used.
 * @param {string} exp - String, which you want to format, for example: `{yyyy}-{MM}-{dd}` or Current time: `{hh}:{mm}:{ss}`.
 * @return {string} String with formatted date.
 *
 * @example
 * format(new Date(2014, 1, 11), '{yyyy}-{MM}-{dd}') //=> '2014-01-11'
 */
export const format = (date: Date, exp: string): string => exp.replace(/\\?{.*?}/g, key => {
	if (key.startsWith('\\')) {
		return key.slice(1);
	}

	switch (key) {
		case '{yyyy}':
			return `${date.getFullYear()}`;
		case '{yy}':
			return `${date.getFullYear()}`.slice(-2);
		case '{MM}':
			return `${(date.getMonth() + 1)}`.padStart(2, '0');
		case '{dd}':
			return `${date.getDate()}`.padStart(2, '0');
		case '{HH}':
			return `${date.getHours()}`.padStart(2, '0');
		case '{mm}':
			return `${date.getMinutes()}`.padStart(2, '0');
		case '{ss}':
			return `${date.getSeconds()}`.padStart(2, '0');
		case '{SSS}':
			return `${date.getMilliseconds()}`.padStart(3, '0');
		default:
			return '';
	}
});

/* c8 ignore next */
export {default as localeFormat} from './locale';
