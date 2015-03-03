request = require 'request'
chai = require 'chai'

expect = chai.expect

it 'Returns a 400 when there isnt a query', (done) ->
  request.get 'http://localhost:3000/search?q=', (err, res, body) ->
    expect(res.statusCode).to.equal(400)
    done()

it 'Returns results when there is a valid query', (done) ->
  request.get 'http://localhost:3000/search?q=test', (err, res, body) ->
    expect(body).to.include('title')
    done()

it 'Weighs title > body', (done) ->
  request.get 'http://localhost:3000/search?q=labels', (err, res, body) ->
    body = JSON.parse body
    expect(body[0].title).to.include('labels')
    done()

it 'Weighs title > body with tokenized strings', (done) ->
  request.get 'http://localhost:3000/search?q=magicians', (err, res, body) ->
    body = JSON.parse body
    expect(body[0].title).to.include('magician')
    done()
