module.exports = (env, callback) ->

  # Helper functions:

  caps = (string) ->
    string.charAt(0).toUpperCase() + string.slice(1)

  format = (string) ->
    string.replace(/\d_/, '').replace(/_/g, ' ').replace('.html', '')

  class MarkdownHelper extends env.plugins.MarkdownPage

    constructor: (@filepath, @metadata, @markdown) ->
      parseOut = (text, headerLevel) ->
        headings = text.match(///\#{#{headerLevel}}.+///gi)

        headings?.map (heading) ->
          heading = heading.replace(///\#{#{headerLevel}}\s?///, '')
          # "heading"-> ["heading", "link"]
          [heading, '#' + heading.toLowerCase().replace(/[^\w]+/g, '-')]
        .filter (heading) ->
          heading[0].slice(0,1) != '#'

      [section1, section2] = @markdown.split("---")
      @metadata.onThisPage = parseOut(section1 || '', 2) || []
      @metadata.FAQs = parseOut(section2 || '', 3) || []

    getTemplate: ->
      @metadata.template or "article.jade"

  env.registerContentPlugin 'pages', '**/*.*(markdown|mkd|md)', MarkdownHelper

  env.helpers.caps = caps
  env.helpers.format = format

  callback()
