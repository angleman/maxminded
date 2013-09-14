var should    = require('should')
  , maxminded = require('../maxminded.js')
  , fs        = require('fs')
  , geofile   = '/tmp/GeoLiteCity.dat'
;


// clean up from prior run
if (fs.existsSync(geofile)) {
    fs.unlinkSync(geofile);
}
if (fs.existsSync(geofile+'.gz')) {
    fs.unlinkSync(geofile+'.gz');
}



describe('successful loading', function() {
    describe('GeoLiteCity.dat.gz', function() {

        var flag = false;
        var location;
        beforeEach(function(done){
            this.timeout(15 * 60 * 1000); // allow test to run for 15 minutes
            maxminded.init({
                start: true
            }, function(err) {
                if (err) {
                    console.log(err);
                    should.not.exist(err);
                }
                location = maxminded.getLocation('66.6.44.4');
                done();
            });
        }); 

        it("location.countryCode should be US", function(){    
            should.exist(location);
            location.countryCode.should.equal('US');
        }); 

    });

});