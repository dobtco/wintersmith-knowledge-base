(function() {
  var async, fs, jade, path,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  async = require('async');

  fs = require('fs');

  jade = require('jade');

  path = require('path');

  module.exports = function(env, callback) {
    var JadeTemplate;
    JadeTemplate = (function(_super) {
      __extends(JadeTemplate, _super);

      function JadeTemplate(fn) {
        this.fn = fn;
      }

      JadeTemplate.prototype.render = function(locals, callback) {
        var error;
        try {
          return callback(null, new Buffer(this.fn(locals)));
        } catch (_error) {
          error = _error;
          return callback(error);
        }
      };

      return JadeTemplate;

    })(env.TemplatePlugin);
    JadeTemplate.fromFile = function(filepath, callback) {
      var _this = this;
      return async.waterfall([
        function(callback) {
          return fs.readFile(filepath.full, callback);
        }, function(buffer, callback) {
          var conf, error, rv;
          conf = env.config.jade || {};
          conf.filename = filepath.full;
          try {
            rv = jade.compile(buffer.toString(), conf);
            return callback(null, new _this(rv));
          } catch (_error) {
            error = _error;
            return callback(error);
          }
        }
      ], callback);
    };
    env.registerTemplatePlugin('**/*.jade', JadeTemplate);
    return callback();
  };

}).call(this);
