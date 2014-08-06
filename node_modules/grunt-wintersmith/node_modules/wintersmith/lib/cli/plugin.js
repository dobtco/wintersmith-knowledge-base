(function() {
  var NpmAdapter, async, cacheDir, childProcess, clip, commonOptions, displayListing, ensureCacheDir, extend, fetchListing, fileExists, fs, getStorageDir, isPlugin, listFile, loadEnv, loadListing, logLevel, logger, lpad, main, max, maxListAge, mkdirp, normalizePluginName, npm, options, path, readJSON, updateIfNeeded, usage, waterfall, writeListing, _ref, _ref1,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  async = require('async');

  fs = require('fs');

  path = require('path');

  npm = require('npm');

  mkdirp = require('mkdirp');

  childProcess = require('child_process');

  _ref = require('./common'), NpmAdapter = _ref.NpmAdapter, getStorageDir = _ref.getStorageDir, loadEnv = _ref.loadEnv, commonOptions = _ref.commonOptions;

  _ref1 = require('./../core/utils'), fileExists = _ref1.fileExists, readJSON = _ref1.readJSON, extend = _ref1.extend;

  logger = require('./../core/logger').logger;

  maxListAge = 3 * 24 * 60 * 60 * 1000;

  cacheDir = path.resolve(getStorageDir(), './cache/');

  listFile = path.join(cacheDir, 'plugins.json');

  usage = "usage: wintersmith plugin [options] <command>\n\ncommands:\n\n  " + 'list'.bold + " - list available plugins\n  " + 'install'.bold + " <plugin> - install plugin\n\noptions:\n\n  -C, --chdir [path]      change the working directory\n  -c, --config [path]     path to config\n  -U, --update            force plugin listing refresh\n";

  options = {
    update: {
      alias: 'U',
      "default": false
    }
  };

  extend(options, commonOptions);

  max = function(array, get) {
    var item, rv, v, _i, _len;
    if (get == null) {
      get = function(item) {
        return item;
      };
    }
    rv = null;
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      item = array[_i];
      v = get(item);
      if (v > rv) {
        rv = v;
      }
    }
    return rv;
  };

  lpad = function(string, amount, char) {
    var i, p, _i, _ref2;
    if (char == null) {
      char = ' ';
    }
    p = '';
    for (i = _i = 0, _ref2 = amount - string.length; 0 <= _ref2 ? _i < _ref2 : _i > _ref2; i = 0 <= _ref2 ? ++_i : --_i) {
      p += char;
    }
    return p + string;
  };

  clip = function(string, maxlen) {
    if (string.length <= maxlen) {
      return string;
    }
    return string.slice(0, maxlen - 2).trim() + "..";
  };

  isPlugin = function(module) {
    return __indexOf.call(module.keywords, 'wintersmith-plugin') >= 0;
  };

  ensureCacheDir = function(callback) {
    return mkdirp(cacheDir, function(error) {
      return callback(error);
    });
  };

  fetchListing = function(callback) {
    return async.waterfall([
      function(callback) {
        return npm.load({
          logstream: new NpmAdapter(logger)
        }, callback);
      }, function(_, callback) {
        return npm.commands.search('wintersmith', true, 60, callback);
      }, function(result, callback) {
        var key, plugins, updated, value;
        plugins = ((function() {
          var _results;
          _results = [];
          for (key in result) {
            value = result[key];
            _results.push(value);
          }
          return _results;
        })()).filter(isPlugin);
        updated = Date.now();
        plugins.sort(function(a, b) {
          var an, bn;
          an = normalizePluginName(a.name);
          bn = normalizePluginName(b.name);
          if (an < bn) {
            return -1;
          }
          if (an > bn) {
            return 1;
          }
          return 0;
        });
        return callback(null, {
          updated: updated,
          plugins: plugins
        });
      }
    ], callback);
  };

  loadListing = function(callback) {
    return fileExists(listFile, function(exists) {
      if (exists) {
        return readJSON(listFile, callback);
      } else {
        logger.info('fetching listing for the first time... hang on');
        return fetchListing(function(error, list) {
          if (list != null) {
            list._needsSave = true;
          }
          return callback(error, list);
        });
      }
    });
  };

  writeListing = function(list, callback) {
    var json;
    json = JSON.stringify(list);
    return fs.writeFile(listFile, json, function(error) {
      return callback(error, list);
    });
  };

  displayListing = function(list, callback) {
    var display, left, line, maxw, pad, plugin, _i, _len;
    display = list.plugins.map(function(plugin) {
      var description, maintainers, name;
      name = normalizePluginName(plugin.name);
      description = plugin.description;
      maintainers = plugin.maintainers.map(function(name) {
        return name.slice(1);
      }).join(' ');
      return {
        name: name,
        description: description,
        maintainers: maintainers
      };
    });
    pad = max(display, function(item) {
      return item.name.length;
    });
    maxw = process.stdout.getWindowSize()[0] - 2;
    for (_i = 0, _len = display.length; _i < _len; _i++) {
      plugin = display[_i];
      line = "" + (lpad(plugin.name, pad)) + "  " + (clip(plugin.description, maxw - pad - 2));
      left = maxw - line.length;
      if (left > plugin.maintainers.length) {
        line += lpad(plugin.maintainers, left).grey;
      }
      logger.info(line.replace(/^\s*(\S+)  /, function(m) {
        return m.bold;
      }));
    }
    return callback(null, list);
  };

  updateIfNeeded = function(list, callback) {
    var delta;
    if (list._needsSave) {
      delete list._needsSave;
      return writeListing(list, callback);
    } else {
      delta = Date.now() - list.updated;
      if (delta > maxListAge) {
        logger.verbose('plugin listing stale, updating');
        childProcess.fork(module.id, [logger.transports.cli.level]);
      }
      return callback();
    }
  };

  waterfall = function(flow, callback) {
    /* async.waterfall that allows for parallel tasks*/

    var item, resolved, _i, _len;
    resolved = [];
    for (_i = 0, _len = flow.length; _i < _len; _i++) {
      item = flow[_i];
      switch (typeof item) {
        case 'function':
          resolved.push(item);
          break;
        case 'object':
        case 'array':
          resolved.push(async.apply(async.parallel, item));
          break;
        default:
          return callback(new Error("Invalid item '" + item + "' in flow"));
      }
    }
    return async.waterfall(resolved, callback);
  };

  normalizePluginName = function(name) {
    return name.replace(/^wintersmith\-/, '');
  };

  main = function(argv) {
    var action, cmd, installPlugin, loadCurrentEnv;
    action = argv._[1];
    if (action == null) {
      console.log(usage);
      process.exit(0);
    }
    loadCurrentEnv = function(callback) {
      return loadEnv(argv, callback);
    };
    installPlugin = function(res, callback) {
      var configFile, createPackageJson, env, install, list, name, p, packageFile, plugin, readConfig, saveConfig, updateConfig, _i, _len, _ref2;
      env = res[0], list = res[1];
      name = argv._[2];
      plugin = null;
      _ref2 = list.plugins;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        p = _ref2[_i];
        if (normalizePluginName(p.name) === normalizePluginName(name)) {
          plugin = p;
          break;
        }
      }
      if (!plugin) {
        return callback(new Error("Unknown plugin: " + name));
      }
      configFile = env.config.__filename;
      packageFile = env.resolvePath('package.json');
      createPackageJson = function(callback) {
        return fileExists(packageFile, function(exists) {
          if (exists) {
            return callback();
          } else {
            logger.warn("package.json missing, creating minimal package");
            return fs.writeFile(packageFile, '{\n  "dependencies": {}\n}\n', callback);
          }
        });
      };
      readConfig = function(callback) {
        return readJSON(configFile, callback);
      };
      updateConfig = function(config, callback) {
        var _ref3;
        if (config.plugins == null) {
          config.plugins = [];
        }
        if (_ref3 = plugin.name, __indexOf.call(config.plugins, _ref3) < 0) {
          config.plugins.push(plugin.name);
        }
        return callback(null, config);
      };
      saveConfig = function(config, callback) {
        var json;
        logger.verbose("saving config file: " + configFile);
        json = JSON.stringify(config, null, 2);
        return fs.writeFile(configFile, json + '\n', callback);
      };
      install = function(callback) {
        logger.verbose("installing " + plugin.name);
        process.chdir(env.workDir);
        return async.series([
          createPackageJson, function(callback) {
            return npm.load({
              logstream: new NpmAdapter(logger),
              save: true
            }, callback);
          }, function(callback) {
            return npm.install(plugin.name, callback);
          }
        ], function(error) {
          return callback(error);
        });
      };
      return async.waterfall([install, readConfig, updateConfig, saveConfig], callback);
    };
    switch (action) {
      case 'list':
        if (argv.update) {
          cmd = [ensureCacheDir, fetchListing, displayListing, writeListing];
        } else {
          cmd = [ensureCacheDir, loadListing, displayListing, updateIfNeeded];
        }
        break;
      case 'install':
        cmd = [[loadCurrentEnv, loadListing], installPlugin];
        break;
      default:
        cmd = [
          function(callback) {
            return callback(new Error("Unknown plugin action: " + action));
          }
        ];
    }
    return waterfall(cmd, function(error) {
      if (error != null) {
        logger.error(error.message, error);
        return process.exit(1);
      } else {
        return process.exit(0);
      }
    });
  };

  if (require.main === module) {
    logLevel = process.argv[2] || 'info';
    logger.transports.cli.level = logLevel;
    async.waterfall([ensureCacheDir, fetchListing, writeListing], function(error) {
      if (error != null) {
        return logger.error(error.message, error);
      } else {
        return logger.verbose('plugin listing updated');
      }
    });
  }

  module.exports = main;

  module.exports.usage = usage;

  module.exports.options = options;

}).call(this);
