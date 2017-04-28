/* global THE_BLACK_POT */
;(function () {
  var $ = window.jQuery
  var currentImgIdx = 0
  var slides = $('#slides img')

  function animateSlide () {
    $(slides[currentImgIdx]).fadeIn(1000, function () {
      $(this).delay(4000).fadeOut(1000, checkCurrent)
    })
  }

  function checkCurrent () {
    currentImgIdx++
    if (currentImgIdx === slides.length) {
      currentImgIdx = 0
    }
    animateSlide()
  }

  slides.hide()

  THE_BLACK_POT.animateSlide = animateSlide
})()
