var stringify = require('json-stable-stringify');
var crypto = require('crypto');


function main() {
    var obj = require('./payloads/array_payload.json');
    //var obj = require('./payloads/100k.json');

    console.time("old stringify");
    for (var i = 0; i < 100000; i++) {
        sortedStringify(obj)
    }
    console.timeEnd("old stringify");
    console.time("new stringify");
    for (var i = 0; i < 100000; i++) {
        stringify(obj)
    }
    console.timeEnd("new stringify");
    console.time("generate hash");
    for (var i = 0; i < 100000; i++) {
        generateHash(obj)
    }
    console.timeEnd("generate hash");
    console.time("new generate hash");
    for (var i = 0; i < 100000; i++) {
        newGenerateHash(obj)
    }
    console.timeEnd("new generate hash");

    console.time("old generate hashes");
    for (var i = 0; i < 100000; i++) {
        generateHashes([obj, obj, obj])
    }
    console.timeEnd("old generate hashes");

    console.time("new generate hashes");
    for (var i = 0; i < 100000; i++) {
        newGenerateHashes([obj, obj, obj])
    }
    console.timeEnd("new generate hashes");

};

var sortObject = function (object) {
    if (typeof object !== "object" || object === null) {
        return object;
    }

    var result = [];

    Object.keys(object).sort().forEach(function (key) {
        result.push({
            key: key,
            value: sortObject(object[key])
        });
    });

    return result;
};

var sortedStringify = function (obj) {
    var str = '';
    try {
        if (obj) {
            str = JSON.stringify(sortObject(obj));
        }
    } catch (e) {
        throw e;
    }

    return str;
};

var generateHash = function (plainText) {
    var hash;
    if (plainText) {
        if ('string' !== typeof plainText) {
            plainText = sortedStringify(plainText);
        }
        var shasum = crypto.createHash('sha1');
        shasum.update(plainText);
        hash = shasum.digest('hex');
    }
    return hash;
};

var newGenerateHash = function (plainText) {
    var hash;
    if (plainText) {
        if ('string' !== typeof plainText) {
            plainText = stringify(plainText);
        }
        var shasum = crypto.createHash('sha1');
        shasum.update(plainText);
        hash = shasum.digest('hex');
    }
    return hash;
};


var generateHashes = function(records) {
    var hashes = [];
    var recOut = {};
    for (var i in records) {
        var rec = {};
        var recData = records[i];
        var hash = generateHash(recData);
        hashes.push(hash);
        rec.data = recData;
        rec.hash = hash;
        recOut[i] = rec;
    }
    return generateHash(hashes);
};

var newGenerateHashes = function(records) {
    var recOut = {};
    var shasum = crypto.createHash('sha1');
    for (var i in records) {
        var rec = {};
        var recData = records[i];
        var hash = newGenerateHash(recData);
        shasum.update(hash);
        rec.data = recData;
        rec.hash = hash;
        recOut[i] = rec;
    }
    return shasum.digest('hex');
};



if (require.main === module) {
    main();
}
