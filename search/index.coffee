express = require 'express'
getArticles = require './articles'

getArticles (articles) ->
  searcher = require('./searcher')(articles)
  app = express()

  # CORS
  app.all '*', (req, res, next) ->
    return next() unless req.get('Origin')
    res.set 'Access-Control-Allow-Origin', '*'
    res.set 'Access-Control-Allow-Methods', 'GET, OPTIONS'
    res.set 'Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'
    return res.send(200) if req.method == 'OPTIONS'
    next()

  app.get '/search', (request, response) ->
    searcher request.query.q, (results) ->
      response.send results

  app.listen(process.env.PORT || 3000)

  console.log "Listening on port #{process.env.PORT || 3000}..."
