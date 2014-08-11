$ ->
  $('#choose-app').on 'change', ->
    window.location.href = '/' + $(@).val()

  $(".toggle_toc").on 'click', ->
    $icon = $(@).find('.fa')
    $section = $("##{$(@).attr('name')}")
    willHide = $icon.hasClass('fa-toggle-down')

    $icon.removeClass('fa-toggle-down fa-toggle-up')
    $icon.addClass(if willHide then 'fa-toggle-up' else 'fa-toggle-down')
    $section[if willHide then 'hide' else 'show']()

  if $(".search-results")[0]
    url = "http://dobt-knowledge-base-search.herokuapp.com/search"
    query = decodeURIComponent(window.location.search.slice(3).replace(/\+/g, "%20"))

    $(".centersearch").attr('value', query)

    $(".search-results").text("...")
    $.get url, {q: query}, (data) ->
      $(".search-results").text("")
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

          display = display.replace(new RegExp(query, 'ig'),
            "<span class='highlight'>#{query}</span>")

          $(".search-results").append("
            <div class='result'>
              <h4><a href='#{result.url}'>#{result.title}</a></h4>
              <p class='result-body'>
                #{display}
              </p>
            </div>")
