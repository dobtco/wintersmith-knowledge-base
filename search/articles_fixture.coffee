# Load fixture articles

_ = require 'underscore'
marked = require 'marked'
_s = require 'underscore.string'
natural = require 'natural'

module.exports = (callback) ->
  # Add nlp methods to String.prototype
  natural.PorterStemmer.attach()

  articles = require('./fixtures.json')

  _.each articles, (item) ->
    item.title_token = item.title.tokenizeAndStem().join(" ")
    item.body =  _s.stripTags(marked(item.body))
    item.body_token = item.body.tokenizeAndStem().join(" ")

  console.log "#{articles.length} article fixtures added to search index."

  callback(articles)
