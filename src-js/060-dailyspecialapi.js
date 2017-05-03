/* global THE_BLACK_POT */
;(function () {
  var $ = window.jQuery
  // This retrieves the daily special api data and replaces the html of the today's special section with what is retrieved.
  function showDailySpecial (data) {
    var id = '#' + data.menu_item_id
    var menuItem = $(id)
    $('#dailySpecial').html(menuItem)
  }
  function responseFail () {
    $('#dailySpecial').html('Sorry we are having some techinal difficulties.')
  }

  THE_BLACK_POT.loadingResponse($('#dailySpecial'))

  function fetchDailySpecial () {
    var urlDailySpecial = 'https://json-data.herokuapp.com/restaurant/special/1'
    $.get(urlDailySpecial).done(showDailySpecial).fail(responseFail)
  }

  window.THE_BLACK_POT = window.THE_BLACK_POT || {}
  THE_BLACK_POT.fetchDailySpecial = fetchDailySpecial
})()
