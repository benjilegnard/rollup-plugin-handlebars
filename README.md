# rollup-plugin-handlebars [![Travis Build Status][travis-img]][travis]

[travis-img]: https://travis-ci.org/jibhaine/rollup-plugin-handlebars.svg
[travis]: https://travis-ci.org/jibhaine/rollup-plugin-handlebars

[Rollup](https://github.com/rollup/rollup) plugin to compile handlebar templates.

## Install

```sh
npm i rollup-plugin-handlebars -D
```

## Usage

```js
import { rollup } from 'rollup';
import handlebars from 'rollup-plugin-handlebars';

rollup({
	entry: 'main.js',
	plugins: [
		handlebars({
			// Whether to import partials. Requires all partials to be statically referenced. Defaults to
			// false.
			importPartials: false,
			// Whether a given template should be registered as a partial, given its identifying name.
			// Defaults to false.
			isPartial: (id) => false
		})
	]
});
```

```mustache
<p>Hello {{name}}</p>
```

import the template.

```js
import template from 'template.hbs';

console.log(template({name: 'world'}))
```

## Example

```js
import { rollup } from 'rollup';
import handlebars from 'rollup-plugin-handlebars';

rollup({
	entry: 'main.js',
	plugins: [
		handlebars({
			// handlebar options
		})
	]
});
```

## Example with partial imports

```js
import { rollup } from 'rollup';
import handlebars from 'rollup-plugin-handlebars';

rollup({
	entry: 'main.js',
	plugins: [
		handlebars({
			importPartials: true,
			isPartial: (id, name) => name[0] === '_'
		})
	]
});
```

# License

MIT © [Benjamin Legrand](mailto:contact@benjaminlegrand.net)
