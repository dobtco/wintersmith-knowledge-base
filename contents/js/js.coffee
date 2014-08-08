$ ->
  # console.log('ready')

  document.getElementById('choose-app').onchange = () ->
    window.location.href = '/' + this.value

  $(".toggle_toc").click(() ->
    if $(this).children().hasClass('fa-toggle-down')
      $(this).children().removeClass('fa-toggle-down')
      $(this).children().addClass('fa-toggle-up')
      $('#'+this.name).hide()
    else
      $(this).children().removeClass('fa-toggle-up')
      $(this).children().addClass('fa-toggle-down')
      $('#'+this.name).show()
  )
