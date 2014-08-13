# Toggle class
$(document).on "click", "[data-toggle-class]", ->
  $($(@).data('target')).toggleClass($(@).data('toggle-class'))

$ ->

  # Dynamic email address
  ourEmail = ['hello', '@', 'dobt', '.', 'co'].join('')
  $('#dynamic-email').attr('href', "mailto:#{ourEmail}").append(ourEmail)

  # # Header permalinks
  # for h in $(".article_body > :header")
  #   $(h).'hover' ->
  #     $("#anchor-#{h.id}").show
  #   $(h).prepend("<a class='anchor' id='anchor-#{h.id}' href='##{h.id}'><i class='fa fa-anchor'></a>")

  # Get service status
  $.getJSON 'https://c73bgtwgrhvh.statuspage.io/api/v1/status.json', (data) ->
    return unless data.status?.indicator?

    $('.status.loading').hide()

    if data.status.indicator == 'none'
      $('.status.up').show()
    else if data.status.indicator == 'minor'
      $('.status.partial').show()
    else if (data.status.indicator == 'major') || (data.status.indicator == 'critical')
      $('.status.major').show()

  $('#choose-app').on 'change', ->
    window.location.href = '/' + $(@).val()

  $(".toggle_toc").on 'click', ->
    $h4 = $(@).find('h4')
    $icon = $(@).find('.fa')
    $section = $("##{$(@).attr('name')}")
    willHide = $icon.hasClass('fa-chevron-down')

    $('.toc_section').find('h4').removeClass('active')
    $h4.addClass('active') unless willHide
    $icon.removeClass('fa-chevron-down fa-chevron-up')
    $icon.addClass(if willHide then 'fa-chevron-up' else 'fa-chevron-down')
    $section[if willHide then 'hide' else 'show']()

  if $(".search-results")[0]
    url = "http://dobt-knowledge-base-search.herokuapp.com/search"
    query = $.url().param('q')

    $(".centersearch-input").attr('value', query)

    # Show loading state
    $(".search-results").text("...")

    $.getJSON url, {q: query}, (data) ->
      # Clear loading state
      $(".search-results").html('')

      if data.length < 1
        $(".search-results").append("<h4>No results...</h4>")
      else
        for result in data
          display = "..."
          re_left = "(\\S+\\s){0,8}"
          re_right = "(\\S*\\s\\S+){0,8}"
          re = new RegExp(re_left + query + re_right, 'ig')

          result_match = result.body.match(re)
          if result_match
            for r in result_match.slice(0,10)
              display = display + r + "... "
          else
            display = result.body.match(/([^\.]+\.){0,3}/)[0] + '..'

          display = display.replace(new RegExp(query, 'ig'),
            "<span class='highlight'>#{query}</span>")

          $(".search-results").append("
            <div class='result'>
              <h4><a href='#{result.url}'>#{result.title}</a></h4>
              <p class='result-body'>
                #{display}
              </p>
            </div>")
