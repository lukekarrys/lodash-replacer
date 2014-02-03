var _ = require('lodash-node');


var mappedRange = _.map(_.range(10), function (n) {
    return n * Math.PI;
});

_.each(mappedRange, function (r, i) {
    mappedRange[i] = r + 1000;
});

var x = _.pluck([{x: 1}, {x: 2}], 'x');

module.exports = {ranged: mappedRange, plucked: x};