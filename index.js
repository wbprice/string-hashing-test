'use strict';

const fs = require('fs');
const crypto = require('crypto');
const assert = require('assert');

function md5hash(buf) {
    return crypto.createHash('md5').update(buf).digest('hex');
}

fs.readFile('TEXT.md', function(err, textPayload) {
    assert.ok(!err);
    assert.ok(textPayload);

    const hash1 = md5hash(textPayload);
    const hash2 = md5hash(textPayload.toString());
    // The stringified copy of a buffer hashes the same as the buffer itself.
    assert.equal(hash1, hash2);

    fs.readFile('TEXT-postedit.md', function(err, postEditTextPayload) {
        assert.ok(!err);
        assert.ok(postEditTextPayload);

        const inMemoryEdit = textPayload.toString().replace('Thoughts', 'Drivel');
        
        const hash3 = md5hash(inMemoryEdit);
        const hash4 = md5hash(postEditTextPayload);
        // A buffer converted to a string and modified hashes the same as an identical other file.
        assert.equal(hash3, hash4);
    });

});