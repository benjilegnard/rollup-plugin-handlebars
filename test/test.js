import { rollup } from 'rollup';
import assert from 'assert';
import handlebarsPlugin from '../src/';
import babelPlugin from 'rollup-plugin-babel';

describe('rollup-plugin-handlebars', function() {
	it('compiles hbs templates', function() {
		return rollup({
			entry: `${__dirname}/fixtures/view.js`,
			plugins: [
				handlebarsPlugin(),
				babelPlugin()
			]
		}).then((bundle) => {
			const result = bundle.generate({
				format: 'cjs'
			});
			const View = eval(result.code);

			assert.ok(/Hello world/.test(new View().render()));
		});
	});

	it('should imports partials', function() {
		return rollup({
			entry: `${__dirname}/fixtures/partial-view.js`,
			plugins: [
				handlebarsPlugin({
					importPartials: true
				}),
				babelPlugin()
			]
		}).then((bundle) => {
			const result = bundle.generate({
				format: 'cjs'
			});
			console.log(result.code);
			const View = eval(result.code);

			assert.ok(/Hello world/.test(new View().render()));
		});
	});
});
