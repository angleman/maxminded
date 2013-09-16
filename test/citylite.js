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
    describe('GeoLiteCity.dat', function() {

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
                } else {
                    if (fs.existsSync(geofile)) {
                        var fstat = fs.statSync(geofile);
                        var size  = fstat.size;
                        if (size < 1000000) {
                            throw new Eror('maxminded citylite.js test: ' + geofile + ' invalid with size of: ' + size);
                        }
                    } else {
                        throw new Error('maxminded citylite.js test: ' + goefile + ' is missing');
                    }
                    flag = true;
                    location = maxminded.getLocation('66.6.44.4');
                }
                done();
            });
        }); 

        it("should load successfully", function(){    
            flag.should.equal(true);
        }); 

        it("location.countryCode should be US", function(){    
            should.exist(location);
            location.countryCode.should.equal('US');
        }); 

    });

});