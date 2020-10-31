import test from 'ava';
import {localeFormat} from '../src';

const foo = new Date('8/1/2020, 4:30:09 PM');

test('general', t => {
	t.is(localeFormat(foo, 'foo'), 'foo', 'does nothing if no match');
	t.is(localeFormat(foo, 'MMM'), 'MMM', 'does nothing if no `{}` wrappers');
	t.is(localeFormat(foo, '\\{MMM}'), '{MMM}', 'does nothing if `{` is escaped');
	t.is(localeFormat(foo, String.raw`\{MMM}`), '{MMM}', 'does nothing if `{` is escaped with `String.raw`');
	t.is(localeFormat(foo, '{MMM}'), 'Aug', 'returns abbreviated month');
	t.is(localeFormat(foo, '{MMMM}'), 'August', 'returns wide month');
	t.is(localeFormat(foo, '{MMMMM}'), 'A', 'returns narrow month');
	t.is(localeFormat(foo, '{E}'), 'Sat', 'returns abbreviated day of week');
	t.is(localeFormat(foo, '{EE}'), 'Sat', 'returns abbreviated day of week');
	t.is(localeFormat(foo, '{EEE}'), 'Sat', 'returns abbreviated day of week');
	t.is(localeFormat(foo, '{EEEE}'), 'Saturday', 'returns wide day of week');
	t.is(localeFormat(foo, '{EEEEE}'), 'S', 'returns narrow day of week');
});
