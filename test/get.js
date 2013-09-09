var should    = require('should')
  , maxloader = require('../maxminded.js')
;



describe('load free', function() {
    describe('successful loading GeoLiteCity.dat.gz', function() {

        var flag = true;

        it("flag should be true", function(){    
            flag.should.equal(true);  
        }); 
    });
});