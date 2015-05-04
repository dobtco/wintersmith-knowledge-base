$.fn.extend styledControls: ->
  $(@).find('label.control').each ->
    unless @hasStyledControls
      @hasStyledControls = true
      $(@).find('input').after("<span class='control_styled' />")
