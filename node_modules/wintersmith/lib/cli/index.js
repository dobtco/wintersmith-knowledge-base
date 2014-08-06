(function() {
  var globalOptions, logger, main, optimist, path, usage,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  optimist = require('optimist');

  path = require('path');

  logger = require('./../core/logger').logger;

  usage = "usage: wintersmith [options] [command]\n\ncommands:\n\n  " + 'build'.bold + " [options] - build a site\n  " + 'preview'.bold + " [options] - run local webserver\n  " + 'new'.bold + " <location> - create a new site\n  " + 'plugin'.bold + " - manage plugins\n\n  also see [command] --help\n\nglobal options:\n\n  -v, --verbose   show debug information\n  -q, --quiet     only output critical errors\n  -V, --version   output version and exit\n  -h, --help      show help\n";

  globalOptions = {
    verbose: {
      alias: 'v'
    },
    quiet: {
      alias: 'q'
    },
    version: {
      alias: 'V'
    },
    help: {
      alias: 'h'
    }
  };

  main = function() {
    var argv, cmd, error;
    argv = optimist.options(globalOptions).argv;
    if (argv._[0] != null) {
      try {
        cmd = require("./" + argv._[0]);
      } catch (_error) {
        error = _error;
        if (error.code === 'MODULE_NOT_FOUND') {
          console.log("'" + argv._[0] + "' - no such command");
          process.exit(1);
        } else {
          throw error;
        }
      }
    }
    if (argv.version) {
      console.log(require('./version'));
      process.exit(0);
    }
    if (argv.help || !cmd) {
      console.log(cmd ? cmd.usage : usage);
      process.exit(0);
    }
    if (argv.verbose) {
      if (__indexOf.call(process.argv, '-vv') >= 0) {
        logger.transports.cli.level = 'silly';
      } else {
        logger.transports.cli.level = 'verbose';
      }
    }
    if (argv.quiet) {
      logger.transports.cli.quiet = true;
    }
    if (cmd) {
      return cmd(optimist.options(globalOptions).options(cmd.options).argv);
    }
  };

  module.exports.main = main;

}).call(this);
