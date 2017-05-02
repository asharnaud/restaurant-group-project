/* global THE_BLACK_POT */
;(function () {
  var $ = window.jQuery
  var currentImgNum = 0
  var slides = $('#slides img')

  function animateSlide () {
    $(slides[currentImgNum]).fadeIn(1000, function () {
      $(this).delay(4000)
      .fadeOut(1000, checkCurrent)
    })
  }

  function checkCurrent () {
    currentImgNum++
    if (currentImgNum === slides.length) {
      currentImgNum = 0
    }
    animateSlide()
  }

  slides.hide()

  THE_BLACK_POT.animateSlide = animateSlide
})()
