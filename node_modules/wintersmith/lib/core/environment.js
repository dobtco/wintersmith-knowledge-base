/* environment.coffee*/


(function() {
  var Config, ContentPlugin, ContentTree, Environment, EventEmitter, StaticFile, TemplatePlugin, async, fs, loadTemplates, logger, path, readJSON, readJSONSync, render, runGenerator, utils, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  path = require('path');

  async = require('async');

  fs = require('fs');

  EventEmitter = require('events').EventEmitter;

  utils = require('./utils');

  Config = require('./config').Config;

  _ref = require('./content'), ContentPlugin = _ref.ContentPlugin, ContentTree = _ref.ContentTree, StaticFile = _ref.StaticFile;

  _ref1 = require('./templates'), TemplatePlugin = _ref1.TemplatePlugin, loadTemplates = _ref1.loadTemplates;

  logger = require('./logger').logger;

  render = require('./renderer').render;

  runGenerator = require('./generator').runGenerator;

  readJSON = utils.readJSON, readJSONSync = utils.readJSONSync;

  Environment = (function(_super) {
    __extends(Environment, _super);

    /* The Wintersmith environment.*/


    Environment.prototype.utils = utils;

    Environment.prototype.ContentTree = ContentTree;

    Environment.prototype.ContentPlugin = ContentPlugin;

    Environment.prototype.TemplatePlugin = TemplatePlugin;

    function Environment(config, workDir, logger) {
      this.workDir = workDir;
      this.logger = logger;
      /* Create a new Environment, *config* is a Config instance, *workDir* is the
          working directory and *logger* is a log instance implementing methods for
          error, warn, verbose and silly loglevels.
      */

      this.loadedModules = [];
      this.workDir = path.resolve(this.workDir);
      this.setConfig(config);
      this.reset();
    }

    Environment.prototype.reset = function() {
      /* Reset environment and clear any loaded modules from require.cache*/

      var id;
      this.views = {
        none: function() {
          var args, callback, _i;
          args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), callback = arguments[_i++];
          return callback();
        }
      };
      this.generators = [];
      this.plugins = {
        StaticFile: StaticFile
      };
      this.templatePlugins = [];
      this.contentPlugins = [];
      this.helpers = {};
      while (id = this.loadedModules.pop()) {
        this.logger.verbose("unloading: " + id);
        delete require.cache[id];
      }
      return this.setupLocals();
    };

    Environment.prototype.setConfig = function(config) {
      this.config = config;
      this.contentsPath = this.resolvePath(this.config.contents);
      return this.templatesPath = this.resolvePath(this.config.templates);
    };

    Environment.prototype.setupLocals = function() {
      /* Resolve locals and loads any required modules.*/

      var alias, filename, id, _ref2;
      this.locals = {};
      if (typeof this.config.locals === 'string') {
        filename = this.resolvePath(this.config.locals);
        this.logger.verbose("loading locals from: " + filename);
        this.locals = readJSONSync(filename);
      } else {
        this.locals = this.config.locals;
      }
      _ref2 = this.config.require;
      for (alias in _ref2) {
        id = _ref2[alias];
        logger.verbose("loading module '" + id + "' available in locals as '" + alias + "'");
        if (this.locals[alias] != null) {
          logger.warn("module '" + id + "' overwrites previous local with the same key ('" + alias + "')");
        }
        this.locals[alias] = this.loadModule(id);
      }
    };

    Environment.prototype.resolvePath = function(pathname) {
      /* Resolve *pathname* in working directory, returns an absolute path.*/

      return path.resolve(this.workDir, pathname || '');
    };

    Environment.prototype.resolveContentsPath = function(pathname) {
      /* Resolve *pathname* in contents directory, returns an absolute path.*/

      return path.resolve(this.contentsPath, pathname || '');
    };

    Environment.prototype.resolveModule = function(module) {
      /* Resolve *module* to an absolute path, mimicing the node.js module loading system.*/

      var error, nodeDir;
      switch (module[0]) {
        case '.':
          return require.resolve(this.resolvePath(module));
        case '/':
          return require.resolve(module);
        default:
          nodeDir = this.resolvePath('node_modules');
          try {
            return require.resolve(path.join(nodeDir, module));
          } catch (_error) {
            error = _error;
            return require.resolve(module);
          }
      }
    };

    Environment.prototype.relativePath = function(pathname) {
      /* Resolve path relative to working directory.*/

      return path.relative(this.workDir, pathname);
    };

    Environment.prototype.relativeContentsPath = function(pathname) {
      /* Resolve path relative to contents directory.*/

      return path.relative(this.contentsPath, pathname);
    };

    Environment.prototype.registerContentPlugin = function(group, pattern, plugin) {
      /* Add a content *plugin* to the environment. Files in the contents directory
          matching the glob *pattern* will be instanciated using the plugin's `fromFile`
          factory method. The *group* argument is used to group the loaded instances under
          each directory. I.e. plugin instances with the group 'textFiles' can be found
          in `contents.somedir._.textFiles`.
      */

      this.logger.verbose("registering content plugin " + plugin.name + " that handles: " + pattern);
      this.plugins[plugin.name] = plugin;
      return this.contentPlugins.push({
        group: group,
        pattern: pattern,
        "class": plugin
      });
    };

    Environment.prototype.registerTemplatePlugin = function(pattern, plugin) {
      /* Add a template *plugin* to the environment. All files in the template directory
          matching the glob *pattern* will be passed to the plugin's `fromFile` classmethod.
      */

      this.logger.verbose("registering template plugin " + plugin.name + " that handles: " + pattern);
      this.plugins[plugin.name] = plugin;
      return this.templatePlugins.push({
        pattern: pattern,
        "class": plugin
      });
    };

    Environment.prototype.registerGenerator = function(group, generator) {
      /* Add a generator to the environment. The generator function is called with the env and the
          current content tree. It should return a object with nested ContentPlugin instances.
          These will be merged into the final content tree.
      */

      return this.generators.push({
        group: group,
        fn: generator
      });
    };

    Environment.prototype.registerView = function(name, view) {
      /* Add a view to the environment.*/

      return this.views[name] = view;
    };

    Environment.prototype.getContentGroups = function() {
      /* Return an array of all registered content groups*/

      var generator, groups, plugin, _i, _j, _len, _len1, _ref2, _ref3, _ref4, _ref5;
      groups = [];
      _ref2 = this.contentPlugins;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        plugin = _ref2[_i];
        if (_ref3 = plugin.group, __indexOf.call(groups, _ref3) < 0) {
          groups.push(plugin.group);
        }
      }
      _ref4 = this.generators;
      for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
        generator = _ref4[_j];
        if (_ref5 = generator.group, __indexOf.call(groups, _ref5) < 0) {
          groups.push(generator.group);
        }
      }
      return groups;
    };

    Environment.prototype.loadModule = function(module, unloadOnReset) {
      var id, rv;
      if (unloadOnReset == null) {
        unloadOnReset = false;
      }
      /* Requires and returns *module*, resolved from the current working directory.*/

      if (module.slice(-7) === '.coffee') {
        require('coffee-script');
      }
      this.logger.silly("loading module: " + module);
      id = this.resolveModule(module);
      this.logger.silly("resolved: " + id);
      rv = require(id);
      if (unloadOnReset) {
        this.loadedModules.push(id);
      }
      return rv;
    };

    Environment.prototype.loadPluginModule = function(module, callback) {
      /* Load a plugin *module*. Calls *callback* when plugin is done loading, or an error ocurred.*/

      var done, error, id;
      id = 'unknown';
      done = function(error) {
        if (error != null) {
          error.message = "Error loading plugin '" + id + "': " + error.message;
        }
        return callback(error);
      };
      if (typeof module === 'string') {
        id = module;
        try {
          module = this.loadModule(module);
        } catch (_error) {
          error = _error;
          done(error);
          return;
        }
      }
      try {
        return module.call(null, this, done);
      } catch (_error) {
        error = _error;
        return done(error);
      }
    };

    Environment.prototype.loadViewModule = function(id, callback) {
      /* Load a view *module* and add it to the environment.*/

      var error, module;
      this.logger.verbose("loading view: " + id);
      try {
        module = this.loadModule(id, true);
      } catch (_error) {
        error = _error;
        error.message = "Error loading view '" + id + "': " + error.message;
        callback(error);
        return;
      }
      this.registerView(path.basename(id), module);
      return callback();
    };

    Environment.prototype.loadPlugins = function(callback) {
      /* Loads any plugin found in *@config.plugins*.*/

      var _this = this;
      return async.series([
        function(callback) {
          return async.forEachSeries(_this.constructor.defaultPlugins, function(plugin, callback) {
            var id, module;
            _this.logger.verbose("loading default plugin: " + plugin);
            id = require.resolve("./../plugins/" + plugin);
            module = require(id);
            _this.loadedModules.push(id);
            return _this.loadPluginModule(module, callback);
          }, callback);
        }, function(callback) {
          return async.forEachSeries(_this.config.plugins, function(plugin, callback) {
            _this.logger.verbose("loading plugin: " + plugin);
            return _this.loadPluginModule(plugin, callback);
          }, callback);
        }
      ], callback);
    };

    Environment.prototype.loadViews = function(callback) {
      /* Loads files found in the *@config.views* directory and registers them as views.*/

      var _this = this;
      if (this.config.views == null) {
        return callback();
      }
      return async.waterfall([
        function(callback) {
          return fs.readdir(_this.resolvePath(_this.config.views), callback);
        }, function(filenames, callback) {
          var modules;
          modules = filenames.map(function(filename) {
            return "" + _this.config.views + "/" + filename;
          });
          return async.forEach(modules, _this.loadViewModule.bind(_this), callback);
        }
      ], callback);
    };

    Environment.prototype.getContents = function(callback) {
      /* Build the ContentTree from *@contentsPath*, also runs any registered generators.*/

      var _this = this;
      return async.waterfall([
        function(callback) {
          return ContentTree.fromDirectory(_this, _this.contentsPath, callback);
        }, function(contents, callback) {
          return async.mapSeries(_this.generators, function(generator, callback) {
            return runGenerator(_this, contents, generator, callback);
          }, function(error, generated) {
            var gentree, tree, _i, _len;
            if ((error != null) || generated.length === 0) {
              return callback(error, contents);
            }
            try {
              tree = new ContentTree('', _this.getContentGroups());
              for (_i = 0, _len = generated.length; _i < _len; _i++) {
                gentree = generated[_i];
                ContentTree.merge(tree, gentree);
              }
              ContentTree.merge(tree, contents);
            } catch (_error) {
              error = _error;
              return callback(error);
            }
            return callback(null, tree);
          });
        }
      ], callback);
    };

    Environment.prototype.getTemplates = function(callback) {
      /* Load templates.*/

      return loadTemplates(this, callback);
    };

    Environment.prototype.getLocals = function(callback) {
      /* Returns locals.*/

      return callback(null, this.locals);
    };

    Environment.prototype.load = function(callback) {
      /* Convenience method to load plugins, views, contents, templates and locals.*/

      var _this = this;
      return async.waterfall([
        function(callback) {
          return async.parallel([
            function(callback) {
              return _this.loadPlugins(callback);
            }, function(callback) {
              return _this.loadViews(callback);
            }
          ], callback);
        }, function(_, callback) {
          return async.parallel({
            contents: function(callback) {
              return _this.getContents(callback);
            },
            templates: function(callback) {
              return _this.getTemplates(callback);
            },
            locals: function(callback) {
              return _this.getLocals(callback);
            }
          }, callback);
        }
      ], callback);
    };

    Environment.prototype.preview = function(callback) {
      /* Start the preview server. Calls *callback* with the server instance when it is up and
          running or if an error occurs. NOTE: The returned server instance will be invalid if the
          config file changes and the server is restarted because of it. As a temporary workaround
          you can set the _restartOnConfChange key in settings to false.
      */

      var server;
      this.mode = 'preview';
      server = require('./server');
      return server.run(this, callback);
    };

    Environment.prototype.build = function(outputDir, callback) {
      /* Build the content tree and render it to *outputDir*.*/

      var _this = this;
      this.mode = 'build';
      if (arguments.length < 2) {
        callback = outputDir || function() {};
        outputDir = this.resolvePath(this.config.output);
      }
      return async.waterfall([
        function(callback) {
          return _this.load(callback);
        }, function(result, callback) {
          var contents, locals, templates;
          contents = result.contents, templates = result.templates, locals = result.locals;
          return render(_this, outputDir, contents, templates, locals, callback);
        }
      ], callback);
    };

    return Environment;

  })(EventEmitter);

  Environment.create = function(config, workDir, log) {
    if (log == null) {
      log = logger;
    }
    /* Set up a new environment using the default logger, *config* can be
        either a config object, a Config instance or a path to a config file.
    */

    if (typeof config === 'string') {
      if (workDir == null) {
        workDir = path.dirname(config);
      }
      config = Config.fromFileSync(config);
    } else {
      if (workDir == null) {
        workDir = process.cwd();
      }
      if (!(config instanceof Config)) {
        config = new Config(config);
      }
    }
    return new Environment(config, workDir, log);
  };

  Environment.defaultPlugins = ['page', 'jade', 'markdown'];

  /* Exports*/


  module.exports = {
    Environment: Environment
  };

}).call(this);
