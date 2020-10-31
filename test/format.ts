import test from 'ava';
import {format} from '../src';

const foo = new Date('5/1/2020, 4:30:09 PM');
const bar = new Date('12/31/2003, 5:05:15 AM');

test('general', t => {
	t.is(format(foo, 'foo'), 'foo', 'does nothing if no match');
	t.is(format(foo, 'HH'), 'HH', 'does nothing if no `{}` wrappers');
	t.is(format(foo, '{foo}'), '', 'returns an empty string if invalid pattern');

	t.is(format(foo, '{yy}'), '20', 'returns partial year');
	t.is(format(foo, '{yyyy}'), '2020', 'returns full year');
	t.is(format(foo, '{MM}'), '05', 'returns month');
	t.is(format(bar, '{MM}'), '12', 'returns month');
	t.is(format(foo, '{dd}'), '01', 'returns day');
	t.is(format(bar, '{dd}'), '31', 'returns day');
	t.is(format(foo, '{HH}'), '16', 'returns hour');
	t.is(format(bar, '{HH}'), '05', 'returns hour');
	t.is(format(foo, '{mm}'), '30', 'returns minute');
	t.is(format(bar, '{mm}'), '05', 'returns minute');
	t.is(format(foo, '{ss}'), '09', 'returns second');
	t.is(format(bar, '{ss}'), '15', 'returns second');
	t.is(format(foo, '{SSS}'), '000', 'returns millisecond');

	t.is(format(new Date(1559607289771), '{SSS}'), '771', 'returns millisecond');
});

test('formats', t => {
	t.is(format(foo, '[{HH}:{mm}:{ss}]'), '[16:30:09]', 'returns formatted time string');
	t.is(format(foo, 'The date is {MM}/{dd}/{yyyy}!'), 'The date is 05/01/2020!', 'returns formatted date string');
	t.is(format(foo, 'Created on: [{yyyy}-{MM}-{dd} ~ {HH}:{mm}:{ss}.{SSS}]'), 'Created on: [2020-05-01 ~ 16:30:09.000]', 'kitchen sink');

	t.is(
		format(foo, 'Year is {yyyy} but {foo} is invalid'),
		'Year is 2020 but  is invalid',
		'returns formatted year but empty string for the invalid pattern'
	);
});
