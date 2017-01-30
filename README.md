Test on Hashing
===============

## Run
```
npm test
```
> Note: node_modules is checked-in because node_modules/json-stable-stringify/index.js has been modified (trying to optimized it) - still WIP.

## Test different paylaod
Running different test by changing the different [payload](payloads/) in [index.js](index.js#L6).

## Observation

* with payloads/array_payload.sjon:

```
old stringify: 1227.157ms
new stringify: 862.798ms
generate hash: 1913.885ms
new generate hash: 1586.275ms
old generate hashes: 7188.193ms
new generate hashes: 5794.325ms
```

when payload conatin arrays => better perf (30% better)

* with payloads/1k.json, worse result :(

```
old stringify: 33625.186ms
new stringify: 36842.008ms
generate hash: 57635.046ms
new generate hash: 81013.596ms
```

## To investigate...
* avoid stringify all together and hash object field directly 
* see if sha1 could be replace by md5 in some cases...
