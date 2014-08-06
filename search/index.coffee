express = require 'express'
getArticles = require './articles'

getArticles (articles) ->
  searcher = require('./searcher')(articles)
  app = express()

  app.get '/search', (request, response) ->
    searcher request.query.q, (results) ->
      response.send results

  app.listen(process.env.PORT || 3000)
  
  console.log "Listening on port #{process.env.PORT || 3000}..."
