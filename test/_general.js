// test/main.js
var should = require('should')
  , fs     = require('fs')
;

// clean up from prior run
if (fs.existsSync('/tmp/GeoLiteCity.dat')) {
	fs.unlinkSync('/tmp/GeoLiteCity.dat');
}
if (fs.existsSync('/tmp/GeoLiteCity.dat.gz')) {
	fs.unlinkSync('/tmp/GeoLiteCity.dat.gz');
}

describe('package', function() {
    describe('should', function() {
    	var maxminded;
    	it('load', function() {
	        maxminded = require('../maxminded.js');
        });
    });
});