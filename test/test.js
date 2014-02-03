var before = require('./usesLodash');
var after = require('./_usesLodash');
var assert = require('assert');

describe('Before and after replace should be the same', function () {

    it('Should return the same value from both files', function () {
        assert.equal(before.join(), after.join());
    });

});