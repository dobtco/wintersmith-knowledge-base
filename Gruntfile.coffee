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
          callback: (crawler) ->
            # We were getting weird false positives here.
            # Not sure why the crawler is crawling javascript?
            crawler.addFetchCondition (url) ->
              !url.path.match('strictMode') &&
              !url.path.match('.js')

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


  grunt.registerTask 'deploy', ['link-checker:dev', 'wintersmith:build', 'gh-pages', 'gitpush:heroku']
