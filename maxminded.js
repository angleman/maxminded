var maxmind    = require('maxmind')        // runk/node-maxmind
  , loader     = require('maxmind-loader') // angleman/maxmind-loader
  , geos       = require('geos-major')     // angleman/geos-major
  , cron       = require('cron').CronJob   // ncb000gt/node-cron
  , time       = require('time')           // TooTallNate/node-time
;



var maxminded = {

	this.maxmind_initalized = false;
	this.load_begin = function() {
		console.log('load begin');
		loader(this.options, this.load_done);
	};

	this.load_done = function (err, datapath){
		if (err) {
			this.handle_error(err);
		} else {
			maxmind.init(datapath, this.options);
			this.maxmind_initalized = true;
		}
	};

	this.handle_error = function (err){
		console.log(err);
		if (this.retry) {
			// todo: reschedule job
		}
	};

	this.init = function(options) {
		if (typeof options == 'string') {
			options      = { init: options };
		}

		if (options.init) {
			maxmind.init(options.init, options);
			this.maxmind_initalized = true;
		}

		options          = options          || {};
		options.cronTime = options.cronTime || '00 30 03 * * 3';
		options.start    = options.start    || false;
		this.options     = options;

		this.job = new cronJob(options, this.load_begin, this.load_done);
		this.job.start();
	};



	// maxmind wrapper
	this.getLocation = function (options, headers) {
		var result = undefined;
		if (this.maxmind_initalized) {
			result = maxmind.getLocation(options);
		}
		if (!result && headers && headers['cf-ipcountry']) {
			result = geos.getCountry(headers['cf-ipcountry']);
		}
		return result;
	};

	// maxmind pass-thru
	this.getCountry = function (options) {
		return maxmind.getCountry(options);
	};

	this.getOrganization = function (options) {
		return maxmind.getOrganization(options);
	};
}



module.exports = maxminded;