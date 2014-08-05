module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-wintersmith'
  grunt.loadNpmTasks 'grunt-gh-pages'

  grunt.initConfig
    pkg: '<json:package.json>'

    wintersmith:
      build: {}

    'gh-pages':
      options:
        base: 'build'
      src: ['**']

  grunt.registerTask 'deploy', ['wintersmith:build', 'gh-pages']
