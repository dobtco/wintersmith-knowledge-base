/* config.coffee*/


(function() {
  var Config, async, fileExists, fileExistsSync, fs, path, readJSON, readJSONSync, _ref;

  fs = require('fs');

  path = require('path');

  async = require('async');

  _ref = require('./utils'), readJSON = _ref.readJSON, readJSONSync = _ref.readJSONSync, fileExists = _ref.fileExists, fileExistsSync = _ref.fileExistsSync;

  Config = (function() {
    /* The configuration object*/

    Config.defaults = {
      contents: './contents',
      ignore: [],
      locals: {},
      plugins: [],
      require: {},
      templates: './templates',
      views: null,
      output: './build',
      baseUrl: '/',
      hostname: null,
      port: 8080,
      _fileLimit: 40,
      _restartOnConfChange: true
    };

    function Config(options) {
      var defaultValue, option, value, _ref1;
      if (options == null) {
        options = {};
      }
      for (option in options) {
        value = options[option];
        this[option] = value;
      }
      _ref1 = this.constructor.defaults;
      for (option in _ref1) {
        defaultValue = _ref1[option];
        if (this[option] == null) {
          this[option] = defaultValue;
        }
      }
    }

    return Config;

  })();

  Config.fromFile = function(path, callback) {
    /* Read config from *path* as JSON and *callback* with a Config instance.*/

    return async.waterfall([
      function(callback) {
        return fileExists(path, function(exists) {
          if (exists) {
            return readJSON(path, callback);
          } else {
            return callback(new Error("Config file at '" + path + "' does not exist."));
          }
        });
      }, function(options, callback) {
        var config;
        config = new Config(options);
        config.__filename = path;
        return callback(null, config);
      }
    ], callback);
  };

  Config.fromFileSync = function(path) {
    /* Read config from *path* as JSON return a Config instance.*/

    var config;
    if (!fileExistsSync(path)) {
      throw new Error("Config file at '" + path + "' does not exist.");
    }
    config = new Config(readJSONSync(path));
    config.__filename = path;
    return config;
  };

  /* Exports*/


  module.exports = {
    Config: Config
  };

}).call(this);
