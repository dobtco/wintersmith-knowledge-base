module.exports = (env, callback) ->

  class MarkdownHelper extends env.plugins.MarkdownPage

    constructor: (@filepath, @metadata, @markdown) ->
      parseOut = (text) ->
        headings = text.match(/\#\#.+/gi)
        return headings?.map (heading) ->
          heading = heading.replace(/\#\#\s?/, '')
          [heading, '#' + heading.toLowerCase().replace(/\W/g, '-')]

      # to avoid an error if there aren't any sections
      @metadata.onThisPage = []
      @metadata.FAQs = []

      [section1, section2] = @markdown.split("---")
      @metadata.onThisPage = parseOut(section1) if section1
      @metadata.FAQs = parseOut(section2) if section2

  env.registerContentPlugin 'pages', '**/*.*(markdown|mkd|md)', MarkdownHelper

  callback()
