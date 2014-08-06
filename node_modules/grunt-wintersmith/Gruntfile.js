module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({

    cfg: {
      files: [
        'Gruntfile.js',
        'tasks/**/*.js',
        'test/**/*.js'
      ]
    },
    jshint: {
      options: {
        curly:   true,
        eqeqeq:  true,
        immed:   true,
        latedef: true,
        newcap:  true,
        noarg:   true,
        sub:     true,
        undef:   true,
        boss:    true,
        eqnull:  true,
        node:    true
      },
      globals: {},
      dev: '<%= cfg.files %>'
    },
    watch: {
      js: {
        files: '<%= cfg.files %>',
        tasks: ['jshint']
      }
    }

  });

  // Load npm tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Load local tasks
  grunt.loadTasks('tasks');

  // Default task
  grunt.registerTask('default', ['jshint:dev']);
  grunt.registerTask('develop', ['watch']);

};
