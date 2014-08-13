_ = require 'underscore'

module.exports = (results, query) ->
  _.map results, (result) ->
    body = result.body
    excerpt = "..."
    re_left = "(\\S+\\s){0,8}"
    re_right = "(\\S*\\s\\S+){0,8}"
    re = new RegExp(re_left + query + re_right, 'ig')

    result_match = body.match(re)
    if result_match
      for r in result_match.slice(0,10)
        excerpt = excerpt + r + "... "
    else
      excerpt = body.match(/([^\.]+\.){0,3}/)[0] + '..'

    if query
      excerpt = excerpt.replace(new RegExp(query, 'ig'), "<span class='highlight'>#{query}</span>")

    _.extend(result, excerpt: excerpt)
