# Get service status from StatusPage
# Copied from dvl/core/components/splash_footer.coffee
$.getJSON 'https://c73bgtwgrhvh.statuspage.io/api/v1/status.json', (data) ->
  return unless data.status?.indicator?

  newClass = switch data.status.indicator
    when 'none'
      'is_up'
    when 'minor'
      'is_partial'
    when 'major', 'critical'
      'is_down'

  $('.footer_status').addClass newClass
