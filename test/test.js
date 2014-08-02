/* globals describe, it */

var before = require('./usesLodash');
var after = require('./usesLodash__LODASH-REPLACER');
var assert = require('assert');

describe('Before and after replace should be the same', function () {

    it('Should return the same value from both files', function () {
        assert.equal(before.ranged.join(), after.ranged.join());
        assert.equal(before.plucked.join(), after.plucked.join());
    });

});