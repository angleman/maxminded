var maxmind        = require('maxmind')        // runk/node-maxmind
  , maxmind_reload = require('maxmind-reload') // angleman/maxmind-reload
  , geos           = require('geos-major')     // angleman/geos-major
  , cron           = require('cron')           // ncb000gt/node-cron
  , time           = require('time')           // TooTallNate/node-time
  , fs             = require('fs')

  , global_options      = {}
  , global_callback     = null
  , maxmind_initialized = false
;


var maxminded = function() {

	function handle_error(message) {
		if (typeof message == 'string') {
			message = new Error('maxminded: ' + message);
		}
		if (global_callback) {
			global_callback(message)
		} else {
			throw message;
		}
	}


	function init_maxmind(datapath) {
		if (fs.existsSync(datapath)) {
			maxmind.init(datapath, global_options);
			maxmind_initialized = true;
			if (global_callback) {
				global_callback(null, datapath);
			}
		} else {
			handle_error('Can\'t initialize maxmind, missing file ' + datapath);
		}
	};


	function load_done(err, datapath) {
		if (err) {
			handle_error(err);
		} else {
			init_maxmind(datapath);
		};
	}


	function load_begin() {
		maxmind_reload(global_options, load_done);
	};



	this.init = function(options, callback) {
		options            = options          || {};
		if (typeof options == 'string') {
			options        = { initLoad: options };
		};
		if (typeof options.silent == 'undefined') {
			options.silent = true;                   // don't send maxmind-reload attempt messages
		};
		options.dest       = options.dest     || '/tmp/';
		global_callback    = callback;

		if (options.initLoad) {
			init_maxmind(options.initLoad);
		};

		options.cronTime   = options.cronTime || '00 30 03 * * 3';
		options.onTick     = load_begin;
		options.onComplete = load_done;
		global_options     = options;
		this.job           = new cron.CronJob(options);
		this.job.start();

		if (options.start) {
			load_begin();
		}

	};



	// maxmind wrapper
	this.getLocation = function(ip, headers) {
		if (maxmind_initialized) {
			return maxmind.getLocation(ip);
		}
		if (headers) {
			return geos.country(headers['cf-ipcountry']);
		}
		return null;
	};


	// maxmind pass-thru
	this.getCountry = function(options) {
		return maxmind.getCountry(options);
	};


	this.getOrganization = function(options) {
		return maxmind.getOrganization(options);
	};
}


var minded = new maxminded;
module.exports = minded;
