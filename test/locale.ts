import test from 'ava';
import {localeFormat} from '../src';

const foo = new Date('8/1/2020, 4:30:09 PM');

test('general', t => {
	t.is(localeFormat(foo, 'foo'), 'foo', 'does nothing if no match');
	t.is(localeFormat(foo, 'MMM'), 'MMM', 'does nothing if no `{}` wrappers');
	t.is(localeFormat(foo, '\\{MMM}'), '{MMM}', 'does nothing if `{` is escaped');
	t.is(localeFormat(foo, String.raw`\{MMM}`), '{MMM}', 'does nothing if `{` is escaped with `String.raw`');
	t.is(localeFormat(foo, '{foo}'), '', 'returns an empty string if invalid pattern');

	t.is(localeFormat(foo, '{MMM}'), 'Aug', 'returns abbreviated month');
	t.is(localeFormat(foo, '{MMMM}'), 'August', 'returns wide month');
	t.is(localeFormat(foo, '{MMMMM}'), 'A', 'returns narrow month');
	t.is(localeFormat(foo, '{E}'), 'Sat', 'returns abbreviated day of week');
	t.is(localeFormat(foo, '{EE}'), 'Sat', 'returns abbreviated day of week');
	t.is(localeFormat(foo, '{EEE}'), 'Sat', 'returns abbreviated day of week');
	t.is(localeFormat(foo, '{EEEE}'), 'Saturday', 'returns wide day of week');
	t.is(localeFormat(foo, '{EEEEE}'), 'S', 'returns narrow day of week');
});

test('different locales', t => {
	t.is(localeFormat(foo, '{MMM}', 'fi'), 'elo', 'returns abbreviated month for Finnish locale');
	t.is(localeFormat(foo, '{MMMM}', 'fi'), 'elokuu', 'returns wide month for Finnish locale');
	t.is(localeFormat(foo, '{MMMMM}', 'fi'), 'E', 'returns narrow month for Finnish locale');
	t.is(localeFormat(foo, '{E}', 'fi'), 'la', 'returns abbreviated day of week for Finnish locale');
	t.is(localeFormat(foo, '{EE}', 'fi'), 'la', 'returns abbreviated day of week for Finnish locale');
	t.is(localeFormat(foo, '{EEE}', 'fi'), 'la', 'returns abbreviated day of week for Finnish locale');
	t.is(localeFormat(foo, '{EEEE}', 'fi'), 'lauantai', 'returns wide day of week for Finnish locale');
	t.is(localeFormat(foo, '{EEEEE}', 'fi'), 'L', 'returns narrow day of week for Finnish locale');

	t.is(localeFormat(foo, '{MMM}', 'ja-JP'), '8月', 'returns abbreviated month for Japanese locale');
	t.is(localeFormat(foo, '{MMMM}', 'ja-JP'), '8月', 'returns wide month for Japanese locale');
	t.is(localeFormat(foo, '{MMMMM}', 'ja-JP'), '8月', 'returns narrow month for Japanese locale');
	t.is(localeFormat(foo, '{E}', 'ja-JP'), '土', 'returns abbreviated day of week for Japanese locale');
	t.is(localeFormat(foo, '{EE}', 'ja-JP'), '土', 'returns abbreviated day of week for Japanese locale');
	t.is(localeFormat(foo, '{EEE}', 'ja-JP'), '土', 'returns abbreviated day of week for Japanese locale');
	t.is(localeFormat(foo, '{EEEE}', 'ja-JP'), '土曜日', 'returns wide day of week for Japanese locale');
	t.is(localeFormat(foo, '{EEEEE}', 'ja-JP'), '土', 'returns narrow day of week for Japanese locale');
});
