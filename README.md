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
		handlebars()
	]
});
```

```mustache
<p>Hello {{name}}</p>
```

import the template.
```js
import template from 'template.hbs';

console.log(template({name:'world'}))
```

## Example

```js
import { rollup } from 'rollup';
import handlebars from 'rollup-plugin-handlebars';
import babel from 'rollup-plugin-babel';
import { minify } from 'uglify-js';

rollup({
	entry: 'main.js',
	plugins: [
		handlebars({
		    //you can specifically include/exclude files
            include: 'node_modules/**',
            exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],
		    //you can give the plugin a custom compiler
		    compiler:'window.Handlebars',//default
			hbsOptions:{
			    //handlebars options
			}
		})
	]
});
```

# License

MIT
