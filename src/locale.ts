/**
 * Use this API for locale-based formatting.
 *
 * @param {Date}  date - Date object, which should be used.
 * @param {string} exp - String, which you want to format, for example: `{MMMM}` or `Day of week: {EEE}`.
 * @param {string | string[]} [locale="en-US"] - Locale(s), which will be used for formatting.
 * @return {string} String with formatted date.
 *
 * @example
 * localeFormat(new Date(2014, 1, 11), '{MMM}') //=> 'Jan'
 */
export default (date: Date, exp: string, locale: string | string[] = 'en-US'): string => exp.replace(/\\?{.*?}/g, key => {
	if (key.startsWith('\\')) {
		return key.slice(1);
	}

	switch (key) {
		case '{MMMMM}':
			return new Intl.DateTimeFormat(locale, {month: 'narrow'}).format(date);
		case '{MMMM}':
			return new Intl.DateTimeFormat(locale, {month: 'long'}).format(date);
		case '{MMM}':
			return new Intl.DateTimeFormat(locale, {month: 'short'}).format(date);
		case '{EEEEE}':
			return new Intl.DateTimeFormat(locale, {weekday: 'narrow'}).format(date);
		case '{EEEE}':
			return new Intl.DateTimeFormat(locale, {weekday: 'long'}).format(date);
		case '{EEE}':
		case '{EE}':
		case '{E}':
			return new Intl.DateTimeFormat(locale, {weekday: 'short'}).format(date);
		default:
			return '';
	}
});
