lodash-replacer
==============

[lodash-node](http://lodash.com/custom-builds) is amazing. I recently converted a bunch of small projects from code like this:

``` js
var _ = require('lodash');
_.each(/* ... code ... */);
_.map(/* ... code ... */);
_.pluck(/* ... code ... */);
```

To code like this:

``` js
var _map = require('lodash-node/modern/collections/map');
var _each = require('lodash-node/modern/collections/forEach');
var _pluck = require('lodash-node/modern/collections/map');
_.each(/* ... code ... */);
_.map(/* ... code ... */);
_.pluck(/* ... code ... */);
```

This module helps you do that. Give it a file and it will find what lodash methods you are using (using [lodash-finder](https://github.com/spadgos/lodash-finder)) and then write another version of you file with only the methods you need.

## Usage

1. `npm install lodash-replacer -g`
2. Then in a project run `lodash-replacer -f index.js`
3. `lodash-replacer` will write a file `_index.js` with the new var declarations at the top of the file and all calls to lodash functions replaced with the individual methods.

## API

- `-f, --file` The file to run lodash-replacer on
- `-t, --type` The type of individual lodash module you want: modern, comapt or underscore

### Warning

This module is pretty naive at the moment. It uses regex. It fit my use case since my projects were all pretty simple. It could be made more robust with the use of an AST parser and some more options. But for now this works OK for me, but if you'd like to see more, I will happily accept pull requests.

### TODO

- Use AST parsing
- Add option to recursively walk a directory and replace in all files
- Add option to replace file inline
