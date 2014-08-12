module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-wintersmith'
  grunt.loadNpmTasks 'grunt-link-checker'
  grunt.loadNpmTasks 'grunt-gh-pages'
  grunt.loadNpmTasks 'grunt-git'

  grunt.initConfig
    pkg: '<json:package.json>'

    wintersmith:
      build: {}

    'link-checker':
      options:
        maxConcurrency: 20
      dev:
        site: 'localhost'
        options:
          initialPort: 8080
      postDeploy:
        site: 'help.dobt.co'

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
  # grunt.registerTask 'deploy', ['wintersmith:build', 'grunt-link-checker', 'gh-pages', 'gitpush:heroku']
