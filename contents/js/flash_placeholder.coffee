$.fn.extend
  flashPlaceholder: (text, timeout) ->
    @each ->
      initialPlaceholder = $(@).attr('placeholder')
      $(@).val('')
      $(@).attr('placeholder', text)

      if !$(@).data('original-placeholder')
        $(@).data('original-placeholder', initialPlaceholder)

      if timeout
        setTimeout =>
          $(@).attr('placeholder', $(@).data('original-placeholder'))
          $(@).data('original-placeholder', '')
        , timeout
