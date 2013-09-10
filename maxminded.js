var maxmind    = require('maxmind')        // runk/node-maxmind
  , loader     = require('maxmind-loader') // angleman/maxmind-loader
  , geos       = require('geos-major')     // angleman/geos-major
  , cron       = require('cron').CronJob   // ncb000gt/node-cron
  , time       = require('time')           // TooTallNate/node-time
;



var maxminded = {
	this.load_begin = function() {
		console.log('load begin');
		loader(this.options, this.load_done);
	};

	this.load_done = function (err, res, data){
		if (err) {
			this.handle_error(err);
		} else {

		}
	};

	this.handle_error = function (err){
		console.log(err);
		if (this.retry) {
			// todo: reschedule job
		}
	};

	this.init = function(options) {
		options = options || {};
		options.cronTime = options.cronTime || '00 30 03 * * 3';
		options.start    = options.start    || false;
		this.options     = options;

		this.job = new cronJob(options, this.load_begin, this.load_done);
		this.job.start();
	};



	// maxmind pass-thru
	this.getLocation = function (options) {
		return maxmind.getLocation(options);
	};

	this.getCountry = function (options) {
		return maxmind.getCountry(options);
	};

	this.getOrganization = function (options) {
		return maxmind.getOrganization(options);
	};
}



module.exports = maxminded;