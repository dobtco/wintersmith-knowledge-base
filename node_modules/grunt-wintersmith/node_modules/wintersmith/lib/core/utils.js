/* utils.coffee*/


(function() {
  var async, extend, fileExists, fileExistsSync, fs, path, pump, readJSON, readJSONSync, readdirRecursive, rfc822, stripExtension, util;

  util = require('util');

  fs = require('fs');

  path = require('path');

  async = require('async');

  fileExists = fs.exists || path.exists;

  fileExistsSync = fs.existsSync || path.existsSync;

  extend = function(obj, mixin) {
    var method, name, _results;
    _results = [];
    for (name in mixin) {
      method = mixin[name];
      _results.push(obj[name] = method);
    }
    return _results;
  };

  stripExtension = function(filename) {
    /* Remove the file-extension from *filename**/

    return filename.replace(/(.+)\.[^.]+$/, '$1');
  };

  readJSON = function(filename, callback) {
    /* Read and try to parse *filename* as JSON, *callback* with parsed object or error on fault.*/

    return async.waterfall([
      function(callback) {
        return fs.readFile(filename, callback);
      }, function(buffer, callback) {
        var error, rv;
        try {
          rv = JSON.parse(buffer.toString());
          return callback(null, rv);
        } catch (_error) {
          error = _error;
          error.filename = filename;
          error.message = "parsing " + (path.basename(filename)) + ": " + error.message;
          return callback(error);
        }
      }
    ], callback);
  };

  readJSONSync = function(filename) {
    /* Synchronously read and try to parse *filename* as json.*/

    var buffer;
    buffer = fs.readFileSync(filename);
    return JSON.parse(buffer.toString());
  };

  readdirRecursive = function(directory, callback) {
    /* Returns an array representing *directory*, including subdirectories.*/

    var result, walk;
    result = [];
    walk = function(dir, callback) {
      return async.waterfall([
        async.apply(fs.readdir, path.join(directory, dir)), function(filenames, callback) {
          return async.forEach(filenames, function(filename, callback) {
            var relname;
            relname = path.join(dir, filename);
            return async.waterfall([
              async.apply(fs.stat, path.join(directory, relname)), function(stat, callback) {
                if (stat.isDirectory()) {
                  return walk(relname, callback);
                } else {
                  result.push(relname);
                  return callback();
                }
              }
            ], callback);
          }, callback);
        }
      ], callback);
    };
    return walk('', function(error) {
      return callback(error, result);
    });
  };

  pump = function(source, destination, callback) {
    /* Pipe *source* stream to *destination* stream calling *callback* when done*/

    source.pipe(destination);
    source.on('error', function(error) {
      if (typeof callback === "function") {
        callback(error);
      }
      return callback = null;
    });
    return source.on('end', function() {
      if (typeof callback === "function") {
        callback();
      }
      return callback = null;
    });
  };

  rfc822 = function(date) {
    /* return a rfc822 representation of a javascript Date object
        http://www.w3.org/Protocols/rfc822/#z28
    */

    var days, months, pad, time, tzoffset;
    pad = function(i) {
      if (i < 10) {
        return '0' + i;
      } else {
        return i;
      }
    };
    tzoffset = function(offset) {
      var direction, hours, minutes;
      hours = Math.floor(offset / 60);
      minutes = Math.abs(offset % 60);
      direction = hours > 0 ? '-' : '+';
      return direction + pad(Math.abs(hours)) + pad(minutes);
    };
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', ' Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    time = [pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds())].join(':');
    return [days[date.getDay()] + ',', pad(date.getDate()), months[date.getMonth()], date.getFullYear(), time, tzoffset(date.getTimezoneOffset())].join(' ');
  };

  /* Exports*/


  module.exports = {
    fileExists: fileExists,
    fileExistsSync: fileExistsSync,
    extend: extend,
    stripExtension: stripExtension,
    readJSON: readJSON,
    readJSONSync: readJSONSync,
    readdirRecursive: readdirRecursive,
    pump: pump,
    rfc822: rfc822
  };

}).call(this);
