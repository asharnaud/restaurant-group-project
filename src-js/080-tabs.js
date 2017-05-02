/* global THE_BLACK_POT */
;(function () {
  var $ = window.jQuery
  // toggle tabs
  $('.tabs-menu .tabs').click(toggleTabs)

  function toggleTabs (e) {
    // toggles class 'active' in btn tabs
    $('.tabs-menu .tabs').removeClass('active')
    $(this).addClass('active')
    // takes the data att name from the btn and creates an id
    var idName = '#' + e.target.dataset.btn
    $('#menu, #story, #reservation, #reviews, #shop').hide()
    $(idName).fadeToggle()

    THE_BLACK_POT.resizeSidebarHeight()
  }

  // hides the tabs content
  $('#menu, #reservation, #reviews, #shop').hide()
})()
