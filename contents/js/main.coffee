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
    query = window.location.search.slice(3)
    $(".centersearch").attr('value', query)
    $(".search-results").text("...")

    $.get "http://dobt-knowledge-base-search.herokuapp.com/search", {q: query}, (data) ->
      $(".search-results").text("")

      if data.length < 1
        results = "No results..."
      else
        for result in data
          results = "..."
          re_left = "(\\S+\\s){0,8}"
          re_right = "(\\S*\\s\\S+){0,8}"
          re = new RegExp(re_left + query + re_right, 'ig')

          for r, i in result.body.match(re)
            if i < 10
              results = results + r + "... "
          results = results.replace(
            new RegExp(query, 'ig'),
            "<span class='highlight'>#{query}</span>"
          )

        $(".search-results").append("
          <div class='result'>
            <h4><a href='#{result.url}'>#{result.title}</a></h4>
            <p class='result-body'>
              #{results}
            </p>
          </div>
        ")
