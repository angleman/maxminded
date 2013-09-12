var maxmind        = require('maxmind')        // runk/node-maxmind
  , maxmind_loader = require('maxmind-loader') // angleman/maxmind-loader
  , geos           = require('geos-major')     // angleman/geos-major
  , cron           = require('cron')           // ncb000gt/node-cron
  , time           = require('time')           // TooTallNate/node-time
;


var maxmind_initialized = false;

var maxminded = function() {

	this.options = {};

	this.load_begin = function(start_callback, start_options) {
		start_options = start_options || this.options;

		function load_done(err, datapath){
			if (err) {
				this.handle_error(err);
			} else {
				maxmind.init(datapath, start_options);
				maxmind_initialized = true;
				if (start_callback) {
					start_callback(datapath);
				}
			};
		}

		maxmind_loader(start_options, load_done);
	};


	this.handle_error = function (err){
		console.log(err);
//		if (this.retry) {
			// todo: reschedule job
//		}
	};

	this.init = function(options) {
		options          = options          || {};

		if (typeof options == 'string') {
			options      = { initLoad: options };
		};

		options.dest     = options.dest || '/tmp/';

		if (options.initLoad) {
			maxmind.init(options.initLoad, options);
			maxmind_initialized = true;
		};

		options.cronTime   = options.cronTime || '00 30 03 * * 3';

		this.options       = options;
		options.onTick     = this.load_begin;
		options.onComplete = this.load_done;
		this.job           = new cron.CronJob(options);
		this.job.start();

		if (options.start) {
			this.load_begin(options.start, options);
		}
	};



	// maxmind wrapper
	this.getLocation = function (ip, headers) {
		var result;
		if (maxmind_initialized) {
			result = maxmind.getLocation(ip);
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