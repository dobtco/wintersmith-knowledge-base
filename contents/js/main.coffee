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

      for result in data
        $(".search-results").append("
          <div>
            <a href='#{result.url}'>#{result.title}</a>
            <p>#{result.body}</p>
          </div>
        ")
