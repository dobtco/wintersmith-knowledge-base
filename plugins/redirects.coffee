url = require 'url'

module.exports = (env, callback) ->

  class Redirect extends env.ContentPlugin
    constructor: (@from, @to) ->
      @to = url.resolve env.config.baseUrl, @to
      @response = new Buffer """
        <!DOCTYPE html>
        <meta charset=utf-8>
        <title>Redirecting...</title>
        <link rel=canonical href="#{@to}">
        <meta http-equiv=refresh content="0; url=#{@to}">
        <h1>Redirecting...</h1>
        <a href="#{@to}">Click here if you are not redirected.</a>
        <script>location='#{@to}'</script>
      """
    getFilename: -> @from
    getView: -> (args..., callback) -> callback null, @response


  tree = {redirects: {}}
  for filename, redirect of env.config.redirects or {}
    tree.redirects[filename] = new Redirect filename, redirect
    env.logger.info "Redirecting #{ filename } to #{ redirect }"

  env.registerGenerator 'redirects', (contents, callback) ->
    callback null, tree

  callback()
