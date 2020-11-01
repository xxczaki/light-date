# Light Date :alarm_clock:

> Blazing fast & lightweight (180 bytes) date formatting for Node.js and the browser.

[![Build Status](https://github.com/xxczaki/light-date/workflows/CI/badge.svg)](https://github.com/xxczaki/light-date/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/xxczaki/light-date/badge.svg?branch=master)](https://coveralls.io/github/xxczaki/light-date?branch=master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
![minified size](https://img.shields.io/bundlephobia/minzip/light-date)

This module aims to provide super fast and easy way to format dates, while also staying lightweight.

---

## Highlights

* **Small.** 174 bytes (minified and gzipped). No dependencies. [Size Limit](https://github.com/ai/size-limit) controls the size.
* **Fast.** See the [benchmarks](#benchmarks).
* **Compliant.** Follows [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
* **Well tested.** To make sure it handles various use cases correctly.
* **Portable.** Works pretty much everywhere.
* **Written in TypeScript.**

## Install

```
$ npm install light-date
```

## Usage

```js
import {format} from 'light-date';

const date = new Date('5/1/2020, 4:30:09 PM');

format(date, 'The date is {MM}/{dd}/{yyyy}!'); //=> 'The date is 05/01/2020!'
```

## API

### `format(date, exp)`

Returns a string with formatted date.

##### `date`

Type: `Date`

Date object, which should be used.

##### `exp`

Type: `string`

String, which you want to format, for example: `{yyyy}-{MM}-{dd}` or `Current time: {hh}:{mm}:{ss}`.

### `localeFormat(date, exp, locale?)`

Returns a string with formatted date. Uses [`Intl.DateTimeFormat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) for locale-based formatting.

##### `date`

Type: `Date`

Date object, which should be used.

##### `exp`

Type: `string`

String, which you want to format, for example: `{EEE}` or `Era: {GGG}`.

##### `locale`

Type: `string | string[]`\
Default: `'en-US'`

Locale(s), which will be used for formatting.

## Patterns

Format of the string is based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).

##### [`format`](#formatdate-exp)

Use this API for simple, most common formatting:

| **Unit**      | **Pattern**   | **Result examples**    |
| :------------ | :------------ | :--------------------- |
| Calendar year | `{yy}`        | 44, 01, 00, 17         |
|               | `{yyyy}`      | 0044, 0001, 1900, 2020 |
| Month         | `{MM}`        | 01, 02, ..., 12        |
| Day           | `{dd}`        | 01, 02, ..., 31        |
| Hour          | `{HH}`        | 00, 01, 02, ..., 23    |
| Minute        | `{mm}`        | 00, 01, ..., 59        |
| Second        | `{ss}`        | 00, 01, ..., 59        |
| Millisecond   | `{SSS}`       | 000, 0001, ..., 999    |

##### [`localeFormat`](#localeformatdate-exp-locale)

Use this API for locale-based formatting:

| **Unit**    | **Pattern**   | **Result examples**              |
| :---------- | :------------ | :------------------------------- |
| Month       | `{MMM}`       | Jan, Feb, ..., Dec               |
|             | `{MMMM}`      | January, February, ..., December |
|             | `{MMMMM}`     | J, F, ..., D                     |
| Day of week | `{E..EEE}`    | Mon, Tue, Wed, ..., Sun          |
|             | `{EEEE}`      | Monday, Tuesday, ..., Sunday     |
|             | `{EEEEE}`     | M, T, W, T, F, S, S              |

## Benchmarks

```
# Node.js v12.18.3

light-date             x   1,465,394 ops/sec ±0.17% (96 runs sampled)
date-format            x   835,649 ops/sec ±0.20% (96 runs sampled)
moment                 x   650,721 ops/sec ±2.13% (90 runs sampled)
date-fns lightFormat   x   459,170 ops/sec ±0.19% (97 runs sampled)
date-fns format        x   345,845 ops/sec ±4.30% (90 runs sampled)
dayjs                  x   281,183 ops/sec ±0.57% (96 runs sampled)
```

## FAQ

<details>
  <summary>How to use <code>format</code> and <code>localeFormat</code> on one string?</summary>

  ```ts
  import {format, localeFormat} from 'light-date';

  const date = new Date();

  format(date, `Current date: ${localeFormat(date, '{MMMM}')} {dd}, {yyyy}`);
  ```
</details>

<details>
  <summary>How to escape pattern-reserved sequences?</summary>

  Add a backslash before the opening curly bracket:

  ```ts
  import {format} from 'light-date';

  format(new Date(), "I'm escaped: \\{yyyy} but I'm not: {yyyy}");
  //=> "I'm espaced: {yyyy} but I'm not: 2020"
  ```

  To avoid having to escape backslashes, use `String.raw`:

  ```ts
  format(new Date(), String.raw`I'm escaped: \{yyyy} but I'm not: {yyyy}`;
  //=> "I'm espaced: {yyyy} but I'm not: 2020"
  ```
</details>

<details>
  <summary>Why doesn't <code>localeFormat</code> work correctly with some locales in Node?</summary>

  Before version 13, Node is shipped with limited ICU data (= localization data).
  Because of this, using certain locales with `localeFormat` may produce incorrect results in Node up to version 12.

  You can either use Node 13+ or install full ICU data manually:

  1. `npm install --save cross-env full-icu`
  2. Update the `scripts` section of `package.json` to set the environment variable `NODE_ICU_DATA`. For example:

      ```js
      {
        "scripts": {
          // Before
          "start": "index.js",
          "test":  "react-scripts test",

          // After
          "start": "cross-env NODE_ICU_DATA=node_modules/full-icu index.js",
          "test":  "cross-env NODE_ICU_DATA=node_modules/full-icu react-scripts test"
        }
      }
      ```

      This way, when you run `npm start` or `npm test`, Node will load the full ICU data from `node_modules/full-icu`, and you should get correctly formatted results.

      The `cross-env` package is needed to support setting environment variables on Windows.
</details>

## License

MIT © [Antoni Kepinski](https://kepinski.me)
