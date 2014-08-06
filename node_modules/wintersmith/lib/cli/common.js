(function() {
  var Config, Environment, NpmAdapter, async, defaults, fileExists, logger, path, readJSON, stream, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  path = require('path');

  async = require('async');

  stream = require('stream');

  Config = require('./../core/config').Config;

  Environment = require('./../core/environment').Environment;

  logger = require('./../core/logger').logger;

  _ref = require('./../core/utils'), readJSON = _ref.readJSON, fileExists = _ref.fileExists;

  exports.commonOptions = defaults = {
    config: {
      alias: 'c',
      "default": './config.json'
    },
    chdir: {
      alias: 'C',
      "default": null
    },
    contents: {
      alias: 'i'
    },
    templates: {
      alias: 't'
    },
    locals: {
      alias: 'L'
    },
    require: {
      alias: 'R'
    },
    plugins: {
      alias: 'P'
    },
    ignore: {
      alias: 'I'
    }
  };

  exports.commonUsage = ["-C, --chdir [path]            change the working directory", "  -c, --config [path]           path to config (defaults to " + defaults.config["default"] + ")", "  -i, --contents [path]         contents location (defaults to " + defaults.contents["default"] + ")", "  -t, --templates [path]        template location (defaults to " + defaults.templates["default"] + ")", "  -L, --locals [path]           optional path to json file containing template context data", "  -R, --require                 comma separated list of modules to add to the template context", "  -P, --plugins                 comma separated list of modules to load as plugins", "  -I, --ignore                  comma separated list of files/glob-patterns to ignore"].join('\n');

  exports.loadEnv = function(argv, callback) {
    /* creates a new wintersmith environment
        options are resolved with the hierarchy: argv > configfile > defaults
    */

    var workDir;
    workDir = path.resolve(argv.chdir || process.cwd());
    logger.verbose("creating environment - work directory: " + workDir);
    return async.waterfall([
      function(callback) {
        var configPath;
        configPath = path.join(workDir, argv.config);
        return fileExists(configPath, function(exists) {
          if (exists) {
            logger.info("using config file: " + configPath);
            return Config.fromFile(configPath, callback);
          } else {
            logger.verbose("no config file found");
            return callback(null, new Config);
          }
        });
      }, function(config, callback) {
        var alias, excluded, key, module, reqs, v, value, _i, _len, _ref1;
        for (key in argv) {
          value = argv[key];
          excluded = ['_', 'chdir', 'config', 'clean'];
          if (key[0] === '$' || key.length === 1 || __indexOf.call(excluded, key) >= 0) {
            continue;
          }
          if (key === 'ignore' || key === 'require' || key === 'plugins') {
            value = value.split(',');
            if (key === 'require') {
              reqs = {};
              for (_i = 0, _len = value.length; _i < _len; _i++) {
                v = value[_i];
                _ref1 = v.split(':'), alias = _ref1[0], module = _ref1[1];
                if (module == null) {
                  module = alias;
                  alias = module.replace(/\/$/, '').split('/').slice(-1);
                }
                reqs[alias] = module;
              }
              value = reqs;
            }
          }
          config[key] = value;
        }
        return callback(null, config);
      }, function(config, callback) {
        var env;
        logger.verbose('config:', config);
        env = new Environment(config, workDir, logger);
        return callback(null, env);
      }, function(env, callback) {
        var paths;
        paths = ['contents', 'templates'];
        return async.forEach(paths, function(pathname, callback) {
          var resolved;
          resolved = env.resolvePath(env.config[pathname]);
          return fileExists(resolved, function(exists) {
            if (exists) {
              return callback();
            } else {
              return callback(new Error("" + pathname + " path invalid (" + resolved + ")"));
            }
          });
        }, function(error) {
          return callback(error, env);
        });
      }
    ], callback);
  };

  if (stream.Writable == null) {
    stream.Writable = (function(_super) {
      __extends(Writable, _super);

      function Writable() {
        Writable.__super__.constructor.call(this);
        this.writable = true;
      }

      Writable.prototype.write = function(string, encodig) {
        if (encodig == null) {
          encodig = 'utf8';
        }
        return this._write(string, encodig, function() {});
      };

      return Writable;

    })(stream.Stream);
  }

  exports.NpmAdapter = NpmAdapter = (function(_super) {
    __extends(NpmAdapter, _super);

    /* Redirects output of npm to a logger*/


    function NpmAdapter(logger) {
      this.logger = logger;
      this.buffer = '';
      NpmAdapter.__super__.constructor.call(this, {
        decodeStrings: false
      });
    }

    NpmAdapter.prototype._write = function(chunk, encoding, callback) {
      this.buffer += chunk;
      if (chunk.indexOf('\n') !== -1) {
        this.flush();
      }
      return callback();
    };

    NpmAdapter.prototype.flush = function() {
      var line, lines, _i, _len, _results;
      lines = this.buffer.split('\n');
      this.buffer = '';
      _results = [];
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        if (!(line.length > 0)) {
          continue;
        }
        line = line.replace(/^npm /, '');
        if (line.slice(0, 4) === 'WARN') {
          _results.push(this.logger.warn("npm: " + line.slice(5)));
        } else {
          _results.push(this.logger.verbose("npm: " + line));
        }
      }
      return _results;
    };

    return NpmAdapter;

  })(stream.Writable);

  exports.getStorageDir = function() {
    /* Return users wintersmith directory, used for cache and user templates.*/

    var dir, home;
    if (process.env.WINTERSMITH_PATH != null) {
      return process.env.WINTERSMITH_PATH;
    }
    home = process.env.HOME || process.env.USERPROFILE;
    dir = 'wintersmith';
    if (process.platform !== 'win32') {
      dir = '.' + dir;
    }
    return path.resolve(home, dir);
  };

}).call(this);
