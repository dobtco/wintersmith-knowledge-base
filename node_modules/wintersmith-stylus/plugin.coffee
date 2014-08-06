stylus = require 'stylus'
nib    = require 'nib'
path = require 'path'
async = require 'async'
fs = require 'fs'

module.exports = (env, callback) ->

  class StylusPlugin extends env.ContentPlugin

    constructor: (@_filepath, @_text) ->

    getFilename: ->
      @_filepath.relative.replace /styl$/, 'css'

    getView: ->
      return (env, locals, contents, templates, callback) ->
        try
          options = env.config.stylus or {}
          options.filename = this.getFilename()
          options.paths = [path.dirname(@_filepath.full)]
          stylus(@_text, options)
          .use(nib())
          .render (err, css) ->
            if err
              callback err
            else
              callback null, new Buffer css
        catch error
          callback error

  StylusPlugin.fromFile = (filepath, callback) ->
    fs.readFile filepath.full, (error, buffer) ->
      if error
        callback error
      else
        callback null, new StylusPlugin filepath, buffer.toString()

  env.registerContentPlugin 'styles', '**/*.styl', StylusPlugin
  callback()
