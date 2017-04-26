var $ = window.jQuery

var current = 0
var slides = $('#slides img')

function animateSlide () {
  $(slides[current]).fadeIn(1000, function () {
    $(this).delay(4000).fadeOut(1000, checkCurrent)
  })
}

function checkCurrent () {
  current++
  if (current === slides.length) {
    current = 0
  }
  animateSlide()
}

slides.hide()
animateSlide()
