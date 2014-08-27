module.exports = (env, callback) ->

  # Helper functions:

  caps = (string) ->
    string.charAt(0).toUpperCase() + string.slice(1)

  format = (string) ->
    string.replace(/\d_/, '').replace(/_/g, ' ').replace('.html', '')

  alpha_sort = (a, b) ->
    aname = a.filename.toLowerCase()
    bname = b.filename.toLowerCase()
    if (aname < bname)
      return -1
    if (aname > bname)
      return 1
    return 0

  class MarkdownHelper extends env.plugins.MarkdownPage

    constructor: (@filepath, @metadata, @markdown) ->
      parseOut = (text) ->
        headings = text.match(/\#\#.+/gi)

        headings?.map (heading) ->
          heading = heading.replace(/\#\#\s?/, '')
          # "heading"-> ["heading", "link"]
          [heading, '#' + heading.toLowerCase().replace(/[^\w]+/g, '-')]
        .filter (heading) ->
          heading[0].slice(0,1) != '#'

      # to avoid an error if there aren't any sections
      @metadata.onThisPage = []
      @metadata.FAQs = []

      [section1, section2] = @markdown.split("---")
      @metadata.onThisPage = parseOut(section1) if section1
      @metadata.FAQs = parseOut(section2) if section2

    getTemplate: ->
      @metadata.template or "article.jade"

  env.registerContentPlugin 'pages', '**/*.*(markdown|mkd|md)', MarkdownHelper

  env.helpers.caps = caps
  env.helpers.format = format
  env.helpers.alpha_sort = alpha_sort

  callback()
