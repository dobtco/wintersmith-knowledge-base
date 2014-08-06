/* templates.coffee*/


(function() {
  var TemplatePlugin, async, extend, fs, loadTemplates, minimatch, path, readdirRecursive, _ref;

  async = require('async');

  fs = require('fs');

  minimatch = require('minimatch');

  path = require('path');

  _ref = require('./utils'), extend = _ref.extend, readdirRecursive = _ref.readdirRecursive;

  TemplatePlugin = (function() {
    function TemplatePlugin() {}

    /* A template plugin subclass have to implement a `render` instance method and a `fromFile` class method.*/


    TemplatePlugin.prototype.render = function(locals, callback) {
      /* Render template using *locals* and *callback* with a ReadStream or Buffer containing the result.*/

      throw new Error('Not implemented.');
    };

    return TemplatePlugin;

  })();

  TemplatePlugin.fromFile = function(filepath, callback) {
    /* *callback* with a instance of <TemplatePlugin> created from *filepath*. Where *filepath* is
        an object containing the full and relative (to templates directory) path to the file.
    */

    throw new Error('Not implemented.');
  };

  loadTemplates = function(env, callback) {
    /* Load and any templates associated with the environment *env*. Calls *callback* with
        a map of templates as {<filename>: <TemplatePlugin instance>}
    */

    var loadTemplate, resolveFilenames, templates;
    templates = {};
    resolveFilenames = function(filenames, callback) {
      return async.map(filenames, function(filename, callback) {
        return callback(null, {
          full: path.join(env.templatesPath, filename),
          relative: filename
        });
      }, callback);
    };
    loadTemplate = function(filepath, callback) {
      /* Create an template plugin instance from *filepath*.*/

      var i, plugin, _i, _ref1;
      plugin = null;
      for (i = _i = _ref1 = env.templatePlugins.length - 1; _i >= 0; i = _i += -1) {
        if (minimatch(filepath.relative, env.templatePlugins[i].pattern)) {
          plugin = env.templatePlugins[i];
          break;
        }
      }
      if (plugin != null) {
        return plugin["class"].fromFile(filepath, function(error, template) {
          if (error != null) {
            error.message = "template " + filepath.relative + ": " + error.message;
          }
          templates[filepath.relative] = template;
          return callback(error);
        });
      } else {
        return callback();
      }
    };
    return async.waterfall([
      function(callback) {
        return readdirRecursive(env.templatesPath, callback);
      }, resolveFilenames, function(filenames, callback) {
        return async.forEach(filenames, loadTemplate, callback);
      }
    ], function(error) {
      return callback(error, templates);
    });
  };

  /* Exports*/


  module.exports = {
    TemplatePlugin: TemplatePlugin,
    loadTemplates: loadTemplates
  };

}).call(this);
