# We were getting weird false positives here.
# Not sure why the crawler is crawling javascript?
IGNORE_LINK_CHECKER_FALSE_POSITIVES = (crawler) ->
  crawler.addFetchCondition (url) ->
    !url.path.match('strictMode') &&
    !url.path.match('.js')


module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-link-checker'
  grunt.loadNpmTasks 'grunt-gh-pages'
  grunt.loadNpmTasks 'grunt-shell'

  grunt.initConfig
    pkg: '<json:package.json>'

    linkChecker:
      options:
        maxConcurrency: 5
      dev:
        site: 'localhost'
        options:
          initialPort: 8080
          callback: IGNORE_LINK_CHECKER_FALSE_POSITIVES
      postDeploy:
        site: 'help.dobt.co'
        options:
          callback: IGNORE_LINK_CHECKER_FALSE_POSITIVES

    'gh-pages':
      options:
        base: 'build'
        message: 'Deploy (via Grunt)'
      src: ['**']

    shell:
      build:
        command: 'wintersmith build'
      pushtoheroku:
        command: 'git push heroku master'

  grunt.registerTask 'deploy', ['shell:build', 'gh-pages', 'shell:pushtoheroku']
