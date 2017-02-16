'use strict';

const fs = require('fs');
const crypto = require('crypto');
const assert = require('assert');

function md5hash(buf) {
    return crypto.createHash('md5').update(buf).digest('hex');
}

fs.readFile('TEXT.md', function(err, payload) {
    assert.ok(!err);
    assert.ok(payload);

    const hash1 = md5hash(payload);
    const hash2 = md5hash(payload.toString());
    assert.equal(hash1, hash2);
});