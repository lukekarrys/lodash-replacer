var program = require('commander');
var modulePackage = require('./package.json');

program
  .version(modulePackage.version)
  .option('-t, --type [type]', 'The type of lodash module you are using: compat, modern or underscore', String, 'modern')
  .option('-f --file [file]', 'The file to read and replace', String, '')
  .parse(process.argv);

if (!program.file) throw new Error('You must specify a file');

var files = [program.file];
var finder = require('./node_modules/lodash-finder/lib/lodash-finder.js');
var fs = require('fs');
var path = require('path');

files.forEach(function (file) {
    var fileString = fs.readFileSync(file).toString();
    var filename = path.basename(file, '.js');
    var dirname = path.dirname(file);
    var methods = finder(fileString);

    var type = program.type;
    var basePath = './node_modules/lodash-node/' + type + '/';
    var groups = {
        arrays: require(basePath + 'arrays'),
        chaining: require(basePath + 'chaining'),
        collections: require(basePath + 'collections'),
        functions: require(basePath + 'functions'),
        objects: require(basePath + 'objects'),
        support: require(basePath + 'support'),
        utilities: require(basePath + 'utilities')
    };
    var output = [];

    for (var i = 0, m = methods.length; i < m; i++) {
        var method = methods[i];
        for (var group in groups) {
            var groupFns = groups[group];
            if (!!groupFns[method]) {
                output.push('var _' + method + ' = require(\'lodash-node/' + type + '/' + group + '/' + (groupFns[method].name || method) + '\');');
            }
        }
        fileString = fileString.replace(new RegExp('_\.' + method + '\\(', 'g'), '_' + method + '(');
    }

    fileString = fileString.replace(new RegExp("var _ = require\\('lodash-node'\\);\n", 'g'), '');

    output.push('');
    fs.writeFileSync(path.resolve(dirname, '_' + filename + '.js'), output.join('\n') + fileString);

    console.log();
    console.log(file);
    console.log('----------------');
    console.log('The following methods were replaced: ' + methods.join(', '));
});
