module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-wintersmith'
  grunt.loadNpmTasks 'grunt-gh-pages'
  grunt.loadNpmTasks 'grunt-git'

  grunt.initConfig
    pkg: '<json:package.json>'

    wintersmith:
      build: {}

    'gh-pages':
      options:
        base: 'build'
        message: 'Deploy (via Grunt)'
      src: ['**']

    gitpush:
      heroku:
        options:
          remote: 'heroku'


  grunt.registerTask 'deploy', ['wintersmith:build', 'gh-pages', 'gitpush:heroku']
