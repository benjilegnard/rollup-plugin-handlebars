import { createFilter } from 'rollup-pluginutils';
import Handlebars from 'handlebars';
import util from 'util';

// Check if the id is a valid partial according to the user.
function checkIsPartial(id, isPartial) {
  if (typeof isPartial !== 'function') {
    return isPartial;
  }

  const nameIndex = id.lastIndexOf('/');
  const name = nameIndex >= 0 ? id.slice(nameIndex + 1) : id;
  return isPartial(id, name);
}

// From https://github.com/wycats/handlebars.js/blob/master/docs/compiler-api.md
class ImportScanner extends Handlebars.Visitor {
  constructor() {
    super();
    this.partials = [];
  }

  PartialStatement(partial) {
    if (partial.name.type === 'SubExpression') {
      throw new Error('handlebars partials must be statically referenced');
    }

    this.partials.push(partial.name.original);

    return super.PartialStatement(partial);
  }
}

export default function (options = {}) {
  const filter = createFilter(
    options.include || [ '**/*.hbs', '**/*.handlebars', '**/*.mustache' ],
    options.exclude || 'node_modules/**'
  );
  const sourceMap = options.sourceMap !== false;
  const importPartials = !!options.importPartials;
  let isPartial = options.isPartial;
  if (typeof isPartial !== 'boolean' && typeof partial !== 'function') {
    // Backwards compatibility.
    isPartial = importPartials;
  }

  return {
    transform (code, id) {
      if (!filter(id)) return;
      const syntaxTree = Handlebars.parse(code, options);
      const templateFunction = Handlebars.precompile(syntaxTree, options);
      let compiled = "import HandlebarsCompiler from 'handlebars/runtime';\n";

      if (importPartials) {
        const scanner = new ImportScanner();
        scanner.accept(syntaxTree);

        // Import the partials.
        scanner.partials.forEach((partial, partialIndex) => {
          const partialName = JSON.stringify(partial);
          compiled += `import partial${partialIndex} from ${partialName};\n`;
          // If we aren't necessarily registering all templates as partials, just make sure to
          // register the ones that we know to be partials.
          if (isPartial !== true) {
            compiled += `if (!HandlebarsCompiler.partials[${partialName}]) {\n`;
            compiled += `  HandlebarsCompiler.registerPartial(${partialName}, partial${partialIndex});\n`;
            compiled += `}\n`;
          }
        });
      }

      compiled += `const Template = HandlebarsCompiler.template(${templateFunction});\n`;
      if (checkIsPartial(id, isPartial)) {
        compiled += `HandlebarsCompiler.registerPartial(${JSON.stringify(id)}, Template);\n`;
      }
      compiled += `export default Template;\n`;
      return {
        code: compiled,
        map: { mappings: '' }
      };
    }
  };
};
