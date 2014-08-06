(function() {
  var NpmAdapter, async, createSite, fileExists, fileExistsSync, fs, getStorageDir, loadTemplates, logger, ncp, npm, options, path, templates, usage, _ref, _ref1;

  async = require('async');

  fs = require('fs');

  path = require('path');

  npm = require('npm');

  ncp = require('ncp').ncp;

  _ref = require('./common'), NpmAdapter = _ref.NpmAdapter, getStorageDir = _ref.getStorageDir;

  _ref1 = require('./../core/utils'), fileExists = _ref1.fileExists, fileExistsSync = _ref1.fileExistsSync;

  logger = require('./../core/logger').logger;

  templates = {};

  loadTemplates = function(directory) {
    if (!fileExistsSync(directory)) {
      return;
    }
    return fs.readdirSync(directory).map(function(filename) {
      return path.join(directory, filename);
    }).filter(function(filename) {
      return fs.statSync(filename).isDirectory();
    }).forEach(function(filename) {
      return templates[path.basename(filename)] = filename;
    });
  };

  loadTemplates(path.join(__dirname, '../../examples/'));

  loadTemplates(path.join(getStorageDir(), 'templates/'));

  usage = "usage: wintersmith new [options] <path>\n\ncreates a skeleton site in <path>\n\noptions:\n\n  -f, --force             overwrite existing files\n  -T, --template <name>   template to create new site from (defaults to 'blog')\n\n  available templates are: " + (Object.keys(templates).join(', ')) + "\n\nexample:\n\n  create a new site in your home directory\n  $ wintersmith new ~/my-blog\n";

  options = {
    force: {
      alias: 'f'
    },
    template: {
      alias: 'T',
      "default": 'blog'
    }
  };

  createSite = function(argv) {
    /* copy example directory to *location**/

    var copyTemplate, from, installDeps, location, to, validateDestination;
    location = argv._[1];
    if ((location == null) || !location.length) {
      logger.error('you must specify a location');
      return;
    }
    if (templates[argv.template] == null) {
      logger.error("unknown template '" + argv.template + "'");
      return;
    }
    from = templates[argv.template];
    to = path.resolve(location);
    logger.info("initializing new wintersmith site in " + to + " using template " + argv.template);
    validateDestination = function(callback) {
      logger.verbose("checking validity of " + to);
      return fileExists(to, function(exists) {
        if (exists && !argv.force) {
          return callback(new Error("" + to + " already exists. Add --force to overwrite"));
        } else {
          return callback();
        }
      });
    };
    copyTemplate = function(callback) {
      logger.verbose("recursive copy " + from + " -> " + to);
      return ncp(from, to, {}, callback);
    };
    installDeps = function(callback) {
      var packagePath;
      packagePath = path.join(to, 'package.json');
      return fileExists(packagePath, function(exists) {
        var conf;
        if (exists) {
          logger.verbose("installing template dependencies");
          process.chdir(to);
          conf = {
            logstream: new NpmAdapter(logger)
          };
          return npm.load(conf, function(error) {
            if (error != null) {
              return callback(error);
            }
            return npm.install(callback);
          });
        } else {
          return callback();
        }
      });
    };
    return async.series([validateDestination, copyTemplate, installDeps], function(error) {
      if (error) {
        return logger.error(error.message, error);
      } else {
        return logger.info('done!');
      }
    });
  };

  module.exports = createSite;

  module.exports.usage = usage;

  module.exports.options = options;

}).call(this);
