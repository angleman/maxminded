var should    = require('should')
  , maxminded = require('../maxminded.js')
  , fs        = require('fs')
  , geofile   = '/tmp/GeoLiteCity.dat'
;

if (fs.existsSync(geofile)) {
    fs.unlinkSync(geofile);
}

describe('CloudFlare', function() {
    describe('successful USA lookup', function() {

        maxminded.init();
        it("latitude should be 38", function(){
            var header = {'cf-ipcountry':'US'};
            var geo = maxminded.getLocation('66.6.44.4', header);

            should.exist(geo);
            should.exist(geo.latitude);
            geo['latitude'].should.equal(38);  
        }); 

    });

});