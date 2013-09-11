var should  = require('should')
  , maxmind = require('../maxminded.js')
;



describe('CloudFlare', function() {
    describe('successful USA lookup', function() {

        maxmind.init();
        it("flag should be true", function(){
            var header = {'cf-ipcountry':'US'};
            var geo = maxmind.getLocation('66.6.44.4', header);
            should.exist(geo);
            geo.lat.should.equal(38);  
        }); 

    });

});