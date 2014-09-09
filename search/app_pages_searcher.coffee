_ = require 'underscore'

module.exports = (articles) ->
  return (app, terms, callback) ->
    results =  _.filter articles, (article) ->
      article.app_pages &&
      !article.draft &&
      (article.app == app) &&
      (article.app_pages.indexOf(terms) > -1)

    results = _.sortBy results, (article) ->
      article.order

    callback results.map (result) -> _.pick(result, 'title', 'url')
