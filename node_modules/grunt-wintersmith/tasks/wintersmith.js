var wintersmith = require("wintersmith");

module.exports = function(grunt) {

  var done = {};

  var callback = function(error) {
    if(error) {
      throw error;
      done(false);
    }
    if(done) {
      done();
    }
  };

  grunt.registerMultiTask("wintersmith", "Use the wintersmith static site generator", function () {

    var options = this.options();
    grunt.verbose.writeflags(options, 'Options');
    var _ = grunt.util._;

    // Create options object by merging user defined options and default options
    options = _.defaults(options, {
      action: 'build',
      config: './config.json'
    });

    // This is an async task, so we need to get the done function
    done = this.async();

    // Create the Wintersmith environment using config file
    var env = wintersmith(options.config);

    if(options.action === 'build') {
      // Build the site using the specified options
      env.build(callback);
    } else if(options.action === 'preview') {
      // This is asynchronous and needs to continue - be sure done isn't called
      done = null;
      env.preview(callback);
    } else {
      grunt.log.error('Action not supported.  May be build or preview.');
      done(false);
    }

  });

};
