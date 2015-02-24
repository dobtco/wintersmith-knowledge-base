SEARCH_ENDPOINT = "http://dobt-knowledge-base-search.herokuapp.com/search"
# Uncomment the following line to test search w/ development server:
# SEARCH_ENDPOINT = "http://localhost:3000/search"

# Toggle class
$(document).on "click", "[data-toggle-class]", ->
  $($(@).data('target')).toggleClass($(@).data('toggle-class'))

$ ->
  # Placeholder polyfill
  $('input, textarea').placeholder()

  # Dynamic email address
  ourEmail = ['hello', '@', 'dobt', '.', 'co'].join('')
  $('#dynamic-email').attr('href', "mailto:#{ourEmail}").append(ourEmail)

  # Header permalinks
  for h in $(".article_body > :header")
    $(h).hover(
      -> $("#anchor-#{this.id}").show()
      -> $("#anchor-#{this.id}").hide()
    )
    $(h).prepend("<a class='anchor' id='anchor-#{h.id}' href='##{h.id}'><i class='fa fa-link'></i></a>")
    $("#anchor-#{h.id}").hide()

  # Get service status
  $.getJSON 'https://c73bgtwgrhvh.statuspage.io/api/v1/status.json', (data) ->
    return unless data.status?.indicator?

    if data.status.indicator == 'none'
      $('.footer_status').addClass('is_up')
    else if data.status.indicator == 'minor'
      $('.footer_status').addClass('is_partial')
    else if (data.status.indicator == 'major') || (data.status.indicator == 'critical')
      $('.footer_status').addClass('is_down')

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
    query = $.url().param('q')

    $(".centersearch-input").val(query)

    $.getJSON SEARCH_ENDPOINT, { q: query }, (data) ->
      # Clear loading state
      $(".search-results-loading").remove()

      if data.length < 1
        $(".no-search-results").show()
      else
        $('.results-count').show()
                           .find('h3')
                           .text("#{data.length} search result#{if data.length == 1 then '' else 's'}")

        for result in data
          $(".search-results").append("
            <div class='result'>
              <h4><a href='#{result.url}'>#{result.title}</a></h4>
              <p class='result-body'>
                #{result.excerpt}
              </p>
            </div>")
