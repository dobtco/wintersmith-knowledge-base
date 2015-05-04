# Toggle class
$(document).on "click", "[data-toggle-class]", ->
  $($(@).data('target')).toggleClass($(@).data('toggle-class'))
