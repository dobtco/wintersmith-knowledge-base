/* content.coffee*/


(function() {
  var ContentPlugin, ContentTree, StaticFile, async, colors, fs, loadContent, minimatch, minimatchOptions, path, setImmediate, url,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  async = require('async');

  fs = require('fs');

  path = require('path');

  url = require('url');

  colors = require('colors');

  minimatch = require('minimatch');

  minimatchOptions = {
    dot: false
  };

  if (typeof setImmediate === "undefined" || setImmediate === null) {
    setImmediate = process.nextTick;
  }

  ContentPlugin = (function() {
    /* The mother of all plugins*/

    function ContentPlugin() {}

    ContentPlugin.property = function(name, getter) {
      /* Define read-only property with *name*.*/

      var get;
      if (typeof getter === 'string') {
        get = function() {
          return this[getter].call(this);
        };
      } else {
        get = function() {
          return getter.call(this);
        };
      }
      return Object.defineProperty(this.prototype, name, {
        get: get,
        enumerable: true
      });
    };

    ContentPlugin.property('view', 'getView');

    ContentPlugin.prototype.getView = function() {
      /* Return a view that renders the plugin. Either a string naming a exisitng view or a function:
          `(env, locals, contents, templates, callback) ->`
          Where *environment* is the current wintersmith environment, *contents* is the content-tree
          and *templates* is a map of all templates as: {filename: templateInstance}. *callback* should be
          called with a stream/buffer or null if this plugin instance should not be rendered.
      */

      throw new Error('Not implemented.');
    };

    ContentPlugin.property('filename', 'getFilename');

    ContentPlugin.prototype.getFilename = function() {
      /* Return filename for this content. This is where the result of the plugin's view will be written to.*/

      throw new Error('Not implemented.');
    };

    ContentPlugin.property('url', 'getUrl');

    ContentPlugin.prototype.getUrl = function(base) {
      /* Return url for this content relative to *base*.*/

      var filename;
      filename = this.getFilename();
      if (base == null) {
        base = this.__env.config.baseUrl;
      }
      if (!base.match(/\/$/)) {
        base += '/';
      }
      if (process.platform === 'win32') {
        filename = filename.replace(/\\/g, '/');
      }
      return url.resolve(base, filename);
    };

    ContentPlugin.property('pluginColor', 'getPluginColor');

    ContentPlugin.prototype.getPluginColor = function() {
      /* Return vanity color used to identify the plugin when printing the content tree
          choices are: bold, italic, underline, inverse, yellow, cyan, white, magenta,
          green, red, grey, blue, rainbow, zebra or none.
      */

      return 'cyan';
    };

    ContentPlugin.property('pluginInfo', 'getPluginInfo');

    ContentPlugin.prototype.getPluginInfo = function() {
      /* Return plugin information. Also displayed in the content tree printout.*/

      return "url: " + this.url;
    };

    return ContentPlugin;

  })();

  ContentPlugin.fromFile = function(filepath, callback) {
    /* Calls *callback* with an instance of class. Where *filepath* is an object containing
        both the absolute and realative paths for the file. e.g.
        {full: "/home/foo/mysite/contents/somedir/somefile.ext",
         relative: "somedir/somefile.ext"}
    */

    throw new Error('Not implemented.');
  };

  StaticFile = (function(_super) {
    __extends(StaticFile, _super);

    /* Static file handler, simply serves content as-is. Last in chain.*/


    function StaticFile(filepath) {
      this.filepath = filepath;
    }

    StaticFile.prototype.getView = function() {
      return function() {
        var args, callback, error, rs, _i;
        args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), callback = arguments[_i++];
        try {
          rs = fs.createReadStream(this.filepath.full);
        } catch (_error) {
          error = _error;
          return callback(error);
        }
        return callback(null, rs);
      };
    };

    StaticFile.prototype.getFilename = function() {
      return this.filepath.relative;
    };

    StaticFile.prototype.getPluginColor = function() {
      return 'none';
    };

    return StaticFile;

  })(ContentPlugin);

  StaticFile.fromFile = function(filepath, callback) {
    return callback(null, new StaticFile(filepath));
  };

  loadContent = function(env, filepath, callback) {
    /* Helper that loads content plugin found in *filepath*.*/

    var i, plugin, _i, _ref;
    env.logger.silly("loading " + filepath.relative);
    plugin = {
      "class": StaticFile,
      group: 'files'
    };
    for (i = _i = _ref = env.contentPlugins.length - 1; _i >= 0; i = _i += -1) {
      if (minimatch(filepath.relative, env.contentPlugins[i].pattern, minimatchOptions)) {
        plugin = env.contentPlugins[i];
        break;
      }
    }
    return plugin["class"].fromFile(filepath, function(error, instance) {
      if (error != null) {
        error.message = "" + filepath.relative + ": " + error.message;
      }
      if (instance != null) {
        instance.__env = env;
      }
      if (instance != null) {
        instance.__plugin = plugin;
      }
      if (instance != null) {
        instance.__filename = filepath.full;
      }
      return callback(error, instance);
    });
  };

  ContentTree = function(filename, groupNames) {
    var groups, name, parent, _i, _len;
    if (groupNames == null) {
      groupNames = [];
    }
    parent = null;
    groups = {
      directories: [],
      files: []
    };
    for (_i = 0, _len = groupNames.length; _i < _len; _i++) {
      name = groupNames[_i];
      groups[name] = [];
    }
    Object.defineProperty(this, '__groupNames', {
      get: function() {
        return groupNames;
      }
    });
    Object.defineProperty(this, '_', {
      get: function() {
        return groups;
      }
    });
    Object.defineProperty(this, 'filename', {
      get: function() {
        return filename;
      }
    });
    Object.defineProperty(this, 'index', {
      get: function() {
        var item, key;
        for (key in this) {
          item = this[key];
          if (key.slice(0, 6) === 'index.') {
            return item;
          }
        }
      }
    });
    return Object.defineProperty(this, 'parent', {
      get: function() {
        return parent;
      },
      set: function(val) {
        return parent = val;
      }
    });
  };

  ContentTree.fromDirectory = function(env, directory, callback) {
    /* Recursively scan *directory* and build a ContentTree with enviroment *env*.
        Calls *callback* with a nested ContentTree or an error if something went wrong.
    */

    var createInstance, createInstances, filterIgnored, readDirectory, reldir, resolveFilenames, tree;
    reldir = env.relativeContentsPath(directory);
    tree = new ContentTree(reldir, env.getContentGroups());
    env.logger.silly("creating content tree from " + directory);
    readDirectory = function(callback) {
      return fs.readdir(directory, callback);
    };
    resolveFilenames = function(filenames, callback) {
      filenames.sort();
      return async.map(filenames, function(filename, callback) {
        var relname;
        relname = path.join(reldir, filename);
        return callback(null, {
          full: path.join(env.contentsPath, relname),
          relative: relname
        });
      }, callback);
    };
    filterIgnored = function(filenames, callback) {
      /* Exclude *filenames* matching ignore patterns in environment config.*/

      if (env.config.ignore.length > 0) {
        return async.filter(filenames, function(filename, callback) {
          var include, pattern, _i, _len, _ref;
          include = true;
          _ref = env.config.ignore;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            pattern = _ref[_i];
            if (minimatch(filename.relative, pattern, minimatchOptions)) {
              env.logger.verbose("ignoring " + filename.relative + " (matches: " + pattern + ")");
              include = false;
              break;
            }
          }
          return callback(include);
        }, function(result) {
          return callback(null, result);
        });
      } else {
        return callback(null, filenames);
      }
    };
    createInstance = function(filepath, callback) {
      /* Create plugin or subtree instance for *filepath*.*/

      return setImmediate(function() {
        return async.waterfall([
          async.apply(fs.stat, filepath.full), function(stats, callback) {
            var basename;
            basename = path.basename(filepath.relative);
            if (stats.isDirectory()) {
              return ContentTree.fromDirectory(env, filepath.full, function(error, result) {
                result.parent = tree;
                tree[basename] = result;
                tree._.directories.push(result);
                return callback(error);
              });
            } else if (stats.isFile()) {
              return loadContent(env, filepath, function(error, instance) {
                if (!error) {
                  instance.parent = tree;
                  tree[basename] = instance;
                  tree._[instance.__plugin.group].push(instance);
                }
                return callback(error);
              });
            } else {
              return callback(new Error("Invalid file " + filepath.full + "."));
            }
          }
        ], callback);
      });
    };
    createInstances = function(filenames, callback) {
      return async.forEachLimit(filenames, env.config._fileLimit, createInstance, callback);
    };
    return async.waterfall([readDirectory, resolveFilenames, filterIgnored, createInstances], function(error) {
      return callback(error, tree);
    });
  };

  ContentTree.inspect = function(tree, depth) {
    var i, k, keys, pad, rv, s, v, _i, _j, _len;
    if (depth == null) {
      depth = 0;
    }
    /* Return a pretty formatted string representing the content *tree*.*/

    if (typeof tree === 'number') {
      return '[Function: ContentTree]';
    }
    rv = [];
    pad = '';
    for (i = _i = 0; 0 <= depth ? _i <= depth : _i >= depth; i = 0 <= depth ? ++_i : --_i) {
      pad += '  ';
    }
    keys = Object.keys(tree).sort(function(a, b) {
      var ad, bd;
      ad = tree[a] instanceof ContentTree;
      bd = tree[b] instanceof ContentTree;
      if (ad !== bd) {
        return bd - ad;
      }
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    for (_j = 0, _len = keys.length; _j < _len; _j++) {
      k = keys[_j];
      v = tree[k];
      if (v instanceof ContentTree) {
        s = ("" + k + "/\n").bold;
        s += ContentTree.inspect(v, depth + 1);
      } else {
        s = v.pluginColor !== 'none' ? k[v.pluginColor] : k;
        s += (" (" + v.pluginInfo + ")").grey;
      }
      rv.push(pad + s);
    }
    return rv.join('\n');
  };

  ContentTree.flatten = function(tree) {
    /* Return all the items in the *tree* as an array of content plugins.*/

    var key, rv, value;
    rv = [];
    for (key in tree) {
      value = tree[key];
      if (value instanceof ContentTree) {
        rv = rv.concat(ContentTree.flatten(value));
      } else {
        rv.push(value);
      }
    }
    return rv;
  };

  ContentTree.merge = function(root, tree) {
    /* Merge *tree* into *root* tree.*/

    var item, key;
    for (key in tree) {
      item = tree[key];
      if (item instanceof ContentPlugin) {
        root[key] = item;
        root._[item.__plugin.group].push(item);
      } else if (item instanceof ContentTree) {
        if (root[key] == null) {
          root[key] = new ContentTree(key, item.__groupNames);
          root[key].parent = root;
          root[key].parent._.directories.push(root[key]);
        }
        if (root[key] instanceof ContentTree) {
          ContentTree.merge(root[key], item);
        }
      } else {
        throw new Error("Invalid item in tree for '" + key + "'");
      }
    }
  };

  /* Exports*/


  module.exports = {
    ContentTree: ContentTree,
    ContentPlugin: ContentPlugin,
    StaticFile: StaticFile,
    loadContent: loadContent
  };

}).call(this);
