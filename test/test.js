import { rollup } from 'rollup';
import assert from 'assert';
import handlebarsPlugin from '../src/';
import babelPlugin from 'rollup-plugin-babel';

describe('rollup-plugin-handlebars', ()=> {

    it('compiles hbs templates', ()=> {
        return rollup({
            entry: __dirname + '/fixtures/view.js',
            plugins: [handlebarsPlugin(), babelPlugin()]
        }).then(bundle => {
            const result = bundle.generate({
                format: 'cjs'
            });
            const View = eval(result.code);

            assert.ok(new View().render().match(/Hello world/));
        });
    });

    it('can be given a custom compiler', ()=> {
        return rollup({
            entry: __dirname + '/fixtures/view.js',
            plugins: [handlebarsPlugin({compiler:'window.Handlebars'}), babelPlugin()]
        }).then(bundle => {
            const result = bundle.generate({
                format: 'cjs'
            });
            //checks the code produces by rollup contains our custom compiler.
            assert.ok(result.code.match(/HandlebarsCompiler = window\.Handlebars/));
        });
    });

});
