# maxminded [![NPM version](https://badge.fury.io/js/maxminded.png?branch=master)](http://badge.fury.io/js/maxminded) [![Build Status](https://travis-ci.org/angleman/maxminded.png?branch=master)](https://travis-ci.org/angleman/maxminded/builds) [![Dependency Status](https://gemnasium.com/angleman/maxminded.png?branch=master)](https://gemnasium.com/angleman/maxminded) [![License](http://badgr.co/use/MIT.png?bg=%234ed50e)](#licensemit)

Auto updating maxmind GeoIP lookup for free and paid maxmind accounts with optional cloudflare fallback. Leveringing the excellent [node-maxmind](https://github.com/runk/node-maxmind) package, **maxminded** manages regular data updates and provides an ultrafast geoip lookup fallback via [geos-major](https://github.com/angleman/geos-major) and [CloudFlare](https://cloudflare.com) headers when there is a maxmind IP lookup miss.

## Install :hammer:

```
npm install maxminded
```

## Usage :wrench:

Drop in compatible with [node-maxmind](https://github.com/runk/node-maxmind) when using free [Maxmind GeoLiteCity](http://dev.maxmind.com/geoip/legacy/geolite/) data.

```js
maxmind = require('maxminded');
maxmind.init('GeoLiteCity.dat');             // local init data & free Wednesday updates
location = maxmind.getLocation('66.6.44.4'); // City/Location lookup
```

## Free to paid geo data example :wrench:

Start with local free data, until initial paid data is loaded and then do paid data updates every Wednesday.

```js
maxminded = require('maxminded');
maxminded.init({ 
    initLoad:    'GeoLiteCity.dat', // immediately initialize with local free data
    memoryCache: true,              // use memory cache for geo lookups
    license:     'S0meK3yIdHere',   // paid MAXMIND license key
    start:       true               // begin initial paid date update
}, function(err) {                  // callback when re-initialized with paid data 
    if (err) console.log(err)
});

geo = maxminded.getLocation('66.6.44.4'); 
```

## Paid geo data example :wrench:

Use paid data and initialize doing updates every Wednesday and fallback to CloudFlare data until initial download and initialize completes or when maxmind.getLocation() fails to match an ip.

This requires [CloudFlare](http://cloudflare.com) to be enabled for your domain so the cf-country header will be populated.

```js
maxminded = require('maxminded');
maxminded.init({ 
    start:       true               // begin initial free date update
}, function(err) {                 
    if (err) console.log(err)
});

geo = maxmind.getLocation('66.6.44.4', req.headers); // pass in request headers for fallback
```

In this example, getLocation() will return ```undefined``` until the initial data is loaded and there is no cf-country header

## Optional parameters with defaults :bulb:

```js
maxminded.init({
	cronTime:    '00 30 03 * * 3', // update every Wednesday at 3:30am
    dest:        '/tmp/',          // where geo updates are stored
    retries:     5,                // 
}, function(err) {                 // callback when maxmind.init() occurs
    console.log(err);
})
```

For additional parameter details see: [node-maxmind](https://github.com/runk/node-maxmind) and [maxmind-loader](https://github.com/angleman/maxmind-loader) and [node-cron](https://github.com/ncb000gt/node-cron)

## Note for PaaS users (like nodejitsu)

A bonus of using maxminded is that your geo data doesn't need to be pushed to your PaaS with your code deploy. The geo ip data can be pulled directly from maxmind in compressed form when your application launches.

```js
maxminded.init({start: function() {
    var geo = maxminded.getLocation('66.6.44.4'); // GeoCityLite loaded w/weekly updates 
}});
```

## License: MIT

<!--- :angleman@license-md/begin -->
Dependencies:

[![cron](http://badgr.co/cron/MIT.png?bg=%23339e00 "cron@1.0.1 Massachusetts Institute of Technology")](http://github.com/ncb000gt/node-cron)
[![geos-major](http://badgr.co/geos-major/MIT.png?bg=%23339e00 "geos-major@1.1.3 Massachusetts Institute of Technology")](https://github.com/angleman/geos-major)
[![maxmind](http://badgr.co/maxmind/MIT.png?bg=%23339e00 "maxmind@0.3.2 Massachusetts Institute of Technology")](https://github.com/runk/node-maxmind)
[![maxmind-reload](http://badgr.co/maxmind-reload/MIT.png?bg=%23339e00 "maxmind-reload@0.1.9 Massachusetts Institute of Technology")](https://github.com/angleman/maxmind-reload)
[![time](http://badgr.co/time/MIT*.png?bg=%23339e00 "time@0.9.2 Massachusetts Institute of Technology (text scan guess)")](https://github.com/TooTallNate/node-time)


Development Dependencies:

[![grunt](http://badgr.co/grunt/MIT.png?bg=%23339e00 "grunt@0.4.1 Massachusetts Institute of Technology")](https://github.com/gruntjs/grunt)
[![grunt-bump](http://badgr.co/grunt-bump/Unknown.png "grunt-bump@0.0.11 Unknown License")](https://github.com/vojtajina/grunt-bump)
[![grunt-license](http://badgr.co/grunt-license/MIT.png?bg=%23339e00 "grunt-license@0.1.4 Massachusetts Institute of Technology")](https://github.com/AceMetrix/grunt-license)
[![license-md](http://badgr.co/license-md/MIT.png?bg=%23339e00 "license-md@0.3.6 Massachusetts Institute of Technology")](https://github.com/angleman/license-md)
[![mocha](http://badgr.co/mocha/Unknown.png "mocha@1.12.1 Unknown License")](https://github.com/visionmedia/mocha)
[![should](http://badgr.co/should/MIT*.png?bg=%23339e00 "should@1.2.2 Massachusetts Institute of Technology (text scan guess)")](https://github.com/visionmedia/should.js)

<!--- :angleman@license-md/end -->