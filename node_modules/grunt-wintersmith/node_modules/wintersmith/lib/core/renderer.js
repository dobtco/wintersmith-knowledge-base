/* renderer.coffee*/


(function() {
  var ContentTree, Stream, async, extend, fs, mkdirp, path, pump, render, renderView, setImmediate, util, _ref;

  fs = require('fs');

  util = require('util');

  async = require('async');

  path = require('path');

  mkdirp = require('mkdirp');

  Stream = require('stream').Stream;

  ContentTree = require('./content').ContentTree;

  _ref = require('./utils'), pump = _ref.pump, extend = _ref.extend;

  if (typeof setImmediate === "undefined" || setImmediate === null) {
    setImmediate = process.nextTick;
  }

  renderView = function(env, content, locals, contents, templates, callback) {
    return setImmediate(function() {
      var name, view, _locals;
      _locals = {
        env: env,
        contents: contents
      };
      extend(_locals, locals);
      view = content.view;
      if (typeof view === 'string') {
        name = view;
        view = env.views[view];
        if (view == null) {
          callback(new Error("content '" + content.filename + "' specifies unknown view '" + name + "'"));
          return;
        }
      }
      return view.call(content, env, _locals, contents, templates, function(error, result) {
        if (error != null) {
          error.message = "" + content.filename + ": " + error.message;
        }
        return callback(error, result);
      });
    });
  };

  render = function(env, outputDir, contents, templates, locals, callback) {
    /* Render *contents* and *templates* using environment *env* to *outputDir*.
        The output directory will be created if it does not exist.
    */

    var items, renderPlugin;
    env.logger.info("rendering tree:\n" + (ContentTree.inspect(contents, 1)) + "\n");
    env.logger.verbose("render output directory: " + outputDir);
    renderPlugin = function(content, callback) {
      /* render *content* plugin, calls *callback* with true if a file is written; otherwise false.*/

      return renderView(env, content, locals, contents, templates, function(error, result) {
        var destination, writeStream;
        if (error) {
          return callback(error);
        } else if (result instanceof Stream || result instanceof Buffer) {
          destination = path.join(outputDir, content.filename);
          env.logger.verbose("writing content " + content.url + " to " + destination);
          mkdirp.sync(path.dirname(destination));
          writeStream = fs.createWriteStream(destination);
          if (result instanceof Stream) {
            return pump(result, writeStream, callback);
          } else {
            return writeStream.end(result, callback);
          }
        } else {
          env.logger.verbose("skipping " + content.url);
          return callback();
        }
      });
    };
    items = ContentTree.flatten(contents);
    return async.forEachLimit(items, env.config._fileLimit, renderPlugin, callback);
  };

  /* Exports*/


  module.exports = {
    render: render,
    renderView: renderView
  };

}).call(this);
