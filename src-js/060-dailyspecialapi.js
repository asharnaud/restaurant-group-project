/* global THE_BLACK_POT */
;(function () {
  var $ = window.jQuery
  // This retrieves the daily special api data and replaces the html of the today's special section with what is retrieved.
  function dataToSpecial (data) {
    var id = '#' + data.menu_item_id
    var menuItem = $(id)
    $('#dailySpecial').html(menuItem)
  }
  function responseFail (el) {
    el.html('Sorry we are having some techinal difficulties.')
  }

  responseFail($('#dailySpecial'))

  function callDailySpecial () {
    var urlDailySpecial = 'https://json-data.herokuapp.com/restaurant/special/1'
    $.get(urlDailySpecial).done(dataToSpecial).fail(responseFail)
  }

  window.THE_BLACK_POT = window.THE_BLACK_POT || {}
  THE_BLACK_POT.callDailySpecial = callDailySpecial
})()
