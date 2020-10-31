import Table from 'cli-table3';
import {Suite} from 'benchmark';

const date = new Date();
const bench = new Suite();

import moment from 'moment';
import dayjs from 'dayjs';
import {format as fmsFormat, lightFormat} from 'date-fns';
import dateFormat from 'date-format';
import {format} from './src';

bench
	.add('moment', () => moment(date).format('HH:mm:ss'))
	.add('dayjs', () => dayjs(date).format('HH:mm:ss'))
	.add('date-fns format', () => fmsFormat(date, 'HH:mm:ss'))
	.add('date-fns lightFormat', () => lightFormat(date, 'HH:mm:ss'))
	.add('date-format', () => dateFormat('HH:mm:ss', date))
	.add('light-date', () => format(date, '{HH}:{mm}:{ss}'))
	.on('cycle', (event: any) => console.log(String(event.target)))
	.on('complete', function () {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		console.log(`Fastest is ${this.filter('fastest').map('name')}`);

		const tbl = new Table({
			head: ['Name', 'Mean time', 'Ops/sec', 'Diff']
		});

		let previous;
		let difference;

		bench.forEach(element => {
			difference = previous ? (((element.hz - previous) * 100 / previous).toFixed(2) + '% faster') : 'N/A';

			previous = element.hz;
			tbl.push([element.name, element.stats.mean, element.hz.toLocaleString(), difference]);
		});
		console.log(tbl.toString());
	})
	.run();
