wintersmith = require 'wintersmith'
_ = require 'underscore'
natural = require 'natural'

module.exports = (callback) ->
    config = "config.json"
    env = wintersmith config
    env.load (error, contents) ->
        # Add nlp methods to String.prototype
        natural.PorterStemmer.attach()

        articles = []

        recursiveScan = (contents) ->
            _.each contents, (item) ->
              if item.filepath?
                if item.filepath.full.match /\.md$/
                  console.log "+ Adding #{item.filepath.relative} to search index"

                  articles.push
                    title: item.title
                    title_token: item.title.tokenizeAndStem().join(" ")
                    url: item.url
                    body: item.markdown
                    body_token: item.markdown.tokenizeAndStem().join(" ")

                else
                  console.log "- Skipping #{item.filepath.relative}"
              else
                recursiveScan(item)

        recursiveScan(contents.contents.articles)
        console.log ""
        console.log "#{articles.length} articles added to search index."
        console.log ""
        callback(articles)
