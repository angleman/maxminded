# maxminded [![NPM version](https://badge.fury.io/js/maxminded.png?branch=master)](http://badge.fury.io/js/maxminded) [![Build Status](https://travis-ci.org/angleman/maxminded.png?branch=master)](https://travis-ci.org/angleman/maxminded) [![Dependency Status](https://gemnasium.com/angleman/maxminded.png?branch=master)](https://gemnasium.com/angleman/maxminded) [![License](http://badgr.co/use/MIT.png?bg=%234ed50e)](http://opensource.org/licenses/MIT)

Auto updating maxmind GeoIP lookup for free and paid maxmind accounts with optional cloudflare fallback. Leveringing the excellent [node-maxmind](https://github.com/runk/node-maxmind) package, maxminded provides a production oriented option that manages regular data updates. Maxminded provides fallback geoip lookup via [geos-major](https://github.com/angleman/geos-major) which leverages [CloudFlare](https://cloudflare.com) request country code headers to look up geo data when maxmind has a lookup miss.

## Install

```
npm install maxminded
```

## Usage

Just like [node-maxmind](https://github.com/runk/node-maxmind) when using free [Maxmind GeoLiteCity](http://dev.maxmind.com/geoip/legacy/geolite/) data.

```javascript
var maxmind = require('maxminded');
maxmind.init('GeoLiteCity');
var location = maxmind.getLocation('66.6.44.4'); // City/Location lookup
```

## Paid Geo Data Example

```
maxminded({ license: 'MAXMIND_LICENSE', memoryCache: true });
```

## Common optional parameters with default values

```
maxminded({
	license:     undefined,         // maxmind license key, for use with paid data, ex: 'S0meK3yIdHere'
	indexCache:  false,             // use maxmind-node indexCache  at 80,000 lookups / second or
	memoryCache: false,             // use maxmind-node memoryCache at 130,000 lookups / second. Default is 18,000 lookups / second
	crontime:    '00 30 03 * * 3',  // run every Wednesday at 3:30am
	timeZone:    undefined,         // timezone based updates, ex: "America/Los_Angeles"
	start:       false,             // load immediately
})
```

For additional parameters see: [node-maxmind](https://github.com/runk/node-maxmind), [node-cron](https://github.com/package/cron) and [maxmind-loaded](https://github.com/angleman/maxmind-loaded)

## Note for nodejitsu and other PaaS users

A bonus of using maxminded is that your geo data doesn't need to be pushed to nodejitsu with your code deploy. The geo ip data can be pulled directly from maxmind in compressed form when your application launches.

```
maxminded.init({start: true});
```

## License: MIT