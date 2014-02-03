var _map = require('lodash-node/modern/collections/map');
var _range = require('lodash-node/modern/arrays/range');
var _each = require('lodash-node/modern/collections/forEach');
var _pluck = require('lodash-node/modern/collections/map');


var mappedRange = _map(_range(10), function (n) {
    return n * Math.PI;
});

_each(mappedRange, function (r, i) {
    mappedRange[i] = r + 1000;
});

var x = _pluck({}, 'x');

module.exports = mappedRange;