# maxmind-loader [![NPM version](https://badge.fury.io/js/maxminded.png?branch=master)](http://badge.fury.io/js/maxminded) [![Build Status](https://travis-ci.org/angleman/maxminded.png?branch=master)](https://travis-ci.org/angleman/maxminded) [![Dependency Status](https://gemnasium.com/angleman/maxminded.png?branch=master)](https://gemnasium.com/angleman/maxminded) [![License](http://badgr.co/use/MIT.png?bg=%234ed50e)](http://opensource.org/licenses/MIT)

Auto updating maxmind GeoIP lookup for free and paid maxmind accounts and optional cloudflare fallback. Leveringing the excellent [runk/node-maxmind](https://github.com/runk/node-maxmind) package, maxminded provides a production oriented option that manages regular data updates. Maxminded provides fallback geoip lookup via [geos-major](https://github.com/angleman/geos-major) which leverages [CloudFlare](https://cloudflare.com) request country code headers to look up geo data when maxmind has a lookup miss.

## Install

```
npm install maxminded
```

## Usage

Just like node-maxmind when used with free [Maxmind](http://maxmind.com) [GeoLiteCity](http://dev.maxmind.com/geoip/legacy/geolite/) data.

```javascript
var maxmind = require('maxminded');
maxmind.init('GeoLiteCity');
```

## Paid Geo Data Example

```
maxminded({ license: 'MAXMIND_LICENSE', memoryCache: true });
```

## Note for nodejitsu users

A bonus of using maxminded is that your geo data doesn't need to be pushed to nodejitsu with your code deploy as the geo ip data can be pulled directly from maxmind in compressed form when your application launches.

## License: MIT