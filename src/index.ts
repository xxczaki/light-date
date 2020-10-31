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
export const format = (date: Date, exp: string): string => exp.replace(/{.*?}/g, key => {
	if (key === '{yyyy}') {
		return `${date.getFullYear()}`;
	}

	if (key === '{yy}') {
		return `${date.getFullYear()}`.slice(-2);
	}

	if (key === '{MM}') {
		return `${(date.getMonth() + 1)}`.padStart(2, '0');
	}

	if (key === '{dd}') {
		return `${date.getDate()}`.padStart(2, '0');
	}

	if (key === '{HH}') {
		return `${date.getHours()}`.padStart(2, '0');
	}

	if (key === '{mm}') {
		return `${date.getMinutes()}`.padStart(2, '0');
	}

	if (key === '{ss}') {
		return `${date.getSeconds()}`.padStart(2, '0');
	}

	if (key === '{SSS}') {
		return `${date.getMilliseconds()}`.padStart(3, '0');
		/* c8 ignore next 3 */
	}

	return '';
});

/* c8 ignore next */
export {default as localeFormat} from './locale';
