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

## Common optional parameters with defaults

Gives weekly GeoLiteCity data updates and 18,000 lookups / second as the caches are disabled

```
maxminded({
	license:     undefined,        // maxmind license key, for paid data. Ex: 'S0meK3yIdHere'
	indexCache:  false,            // use maxmind-node indexCache  at 80,000 lookups / second or
	memoryCache: false,            // use maxmind-node memoryCache at 130,000 lookups / second
	cronTime:    '00 30 03 * * 3', // run every Wednesday at 3:30am
	timeZone:    undefined,        // timezone based updates, ex: "America/Los_Angeles"
	start:       false,            // load immediately
})
```

For additional parameters see: [node-maxmind](https://github.com/runk/node-maxmind), [node-cron](https://github.com/ncb000gt/node-cron) and [maxmind-loader](https://github.com/angleman/maxmind-loader)

## Note for PaaS users (like nodejitsu)

A bonus of using maxminded is that your geo data doesn't need to be pushed to your PaaS with your code deploy. The geo ip data can be pulled directly from maxmind in compressed form when your application launches.

```
maxminded.init({start: true});
```

## License: MIT

Dependencies:

[![cron](http://badgr.co/mit/cron.png?bg=%234ed50e)](http://github.com/ncb000gt/node-cron) [![geos-major](http://badgr.co/mit/geos-major.png?bg=%234ed50e)](https://github.com/angleman/geos-major) [![maxmind-loader](http://badgr.co/mit/maxmind-loader.png?bg=%234ed50e)](https://github.com/angleman/maxmind-loader) [![maxmind](http://badgr.co/mit/maxmind.png?bg=%234ed50e)](git@github.com:runk/node-maxmind)
[![time](http://badgr.co/mit*/time.png?bg=%234ed50e)](https://github.com/TooTallNate/node-time)