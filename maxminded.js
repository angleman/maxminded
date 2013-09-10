var maxmind    = require('maxmind')        // runk/node-maxmind
  , loader     = require('maxmind-loader') // angleman/maxmind-loader
  , geos       = require('geos-major')     // angleman/geos-major
  , cron       = require('cron')           // ncb000gt/node-cron
  , time       = require('time')           // TooTallNate/node-time
;



var maxminded = function() {

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
		options          = options          || {};

		if (typeof options == 'string') {
			options      = { initLoad: options };
		};

		if (options.initLoad) {
			maxmind.init(options.initLoad, options);
			this.maxmind_initalized = true;
		};

		options.cronTime   = options.cronTime || '00 30 03 * * 3';
		options.start      = options.start    || false;
		this.options       = options;
		options.onTick     = this.load_begin;
		options.onComplete = this.load_done;
		this.job           = new cron.CronJob(options);
		this.job.start();
	};



	// maxmind wrapper
	this.getLocation = function (options, headers) {
		var result;
		if (this.maxmind_initalized) {
			result = maxmind.getLocation(options);
		}
		if (!result && headers) {
			result = geos.country(headers['cf-ipcountry']);
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

var minded = new maxminded;


module.exports = minded;