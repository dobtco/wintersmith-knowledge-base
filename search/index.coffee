express = require 'express'

getArticles =
  if process.env.NODE_ENV == 'test' then require './articles_fixture'
  else require './articles'

getArticles (articles) ->
  searcher = require('./searcher')(articles)
  appPagesSearcher = require('./app_pages_searcher')(articles)
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
    unless request.query.q
      response.status(400)
        .send('please specify a search query (q).')
    else
      searcher request.query.q, (results) ->
        response.send results

  app.get '/app_pages', (request, response) ->
    unless request.query.app && request.query.page_key
      response.status(400)
              .send('please specify both app & page_key URL params.')
    else
      appPagesSearcher request.query.app, request.query.page_key, (results) ->
        response.send results

  app.listen(process.env.PORT || 3000)

  console.log "Listening on port #{process.env.PORT || 3000}..."
