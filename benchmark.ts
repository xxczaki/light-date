import Table from 'cli-table3';
import {Suite} from 'benchmark';

const date = new Date();
const template = 'HH:mm:ss';
const bench = new Suite();

import moment from 'moment';
import dayjs from 'dayjs';
import {format as fmsFormat, lightFormat} from 'date-fns';
import dateFormat from 'date-format';
// @ts-expect-error Missing types
import tinytime from 'tinytime';
import tinydate from 'tinydate';
import {format} from './src';

bench
	.add('moment', () => moment(date).format(template))
	.add('dayjs', () => dayjs(date).format(template))
	.add('date-fns format', () => fmsFormat(date, template))
	.add('date-fns lightFormat', () => lightFormat(date, template))
	.add('date-format', () => dateFormat(template, date))
	.add('tinytime', () => tinytime(template).render(date))
	.add('tinydate', () => tinydate(template)(date))
	.add('light-date', () => format(date, template))
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
			if (previous) {
				difference = ((element.hz - previous) * 100 / previous).toFixed(2) + '% faster';
			} else {
				difference = 'N/A';
			}

			previous = element.hz;
			tbl.push([element.name, element.stats.mean, element.hz.toLocaleString(), difference]);
		});
		console.log(tbl.toString());
	})
	.run();
