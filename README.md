# maxmind-loader [![NPM version](https://badge.fury.io/js/maxminded.png?branch=master)](http://badge.fury.io/js/maxminded) [![Build Status](https://travis-ci.org/angleman/maxminded.png?branch=master)](https://travis-ci.org/angleman/maxminded) [![Dependency Status](https://gemnasium.com/angleman/maxminded.png?branch=master)](https://gemnasium.com/angleman/maxminded) [![License](http://badgr.co/use/MIT.png?bg=%234ed50e)](http://opensource.org/licenses/MIT)

Auto updating maxmind GeoIP lookup for free and paid maxmind accounts and optional cloudflare fallback. Leveringing the excellent [runk/node-maxmind](runk/node-maxmind) package, __maxminded__ provides a production oriented solution that manages regular data updates for you. __Maxminded__ also provides a fallback geoip lookup via [geos-major](angleman/geos-major) that leverages CloudFlare country code headers to look up country data when maxmind has a lookup miss.

## Install

```
npm install maxminded
```

## Usage, just like maxmind when used with free [Maxmind](http://maxmind.com) [GeoLiteCity](http://dev.maxmind.com/geoip/legacy/geolite/) data.

```javascript
var maxmind = require('maxminded');

maxmind.init('GeoLiteCity');
```

## Paid Geo Data Example

```
maxminded({ license: 'MAXMIND_LICENSE', memoryCache: true });
```

## License: MIT