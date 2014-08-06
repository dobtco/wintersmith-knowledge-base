(function() {
  var Config, async, commonOptions, commonUsage, extend, loadEnv, logger, options, preview, usage, util, _ref;

  async = require('async');

  util = require('util');

  extend = require('./../core/utils').extend;

  Config = require('./../core/config').Config;

  logger = require('./../core/logger').logger;

  _ref = require('./common'), loadEnv = _ref.loadEnv, commonUsage = _ref.commonUsage, commonOptions = _ref.commonOptions;

  usage = "usage: wintersmith preview [options]\n\noptions:\n\n  -p, --port [port]             port to run server on (defaults to 8080)\n  -d, --domain [domain]         host to run server on (defaults to localhost)\n  " + commonUsage + "\n\n  all options can also be set in the config file\n\nexamples:\n\n  preview using a config file (assuming config.json is found in working directory):\n  $ wintersmith preview\n";

  options = {
    port: {
      alias: 'p'
    },
    domain: {
      alias: 'd'
    }
  };

  extend(options, commonOptions);

  preview = function(argv) {
    logger.info('starting preview server');
    return async.waterfall([
      function(callback) {
        return loadEnv(argv, callback);
      }, function(env, callback) {
        return env.preview(callback);
      }
    ], function(error) {
      if (error) {
        return logger.error(error.message, error);
      }
    });
  };

  module.exports = preview;

  module.exports.usage = usage;

  module.exports.options = options;

}).call(this);
