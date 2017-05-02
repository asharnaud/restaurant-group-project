/* global THE_BLACK_POT */
;(function () {
  var $ = window.jQuery
  // This retrieves the news api data and replaces the html of the news section with what is retrieved.
  function showNewsHtml (data) {
    $('#title').html(THE_BLACK_POT.escapeHtml(data.title) + '  ' +
     THE_BLACK_POT.escapeHtml(data.date_published))
    var scapedHtmlData = THE_BLACK_POT.escapeHtml(data.post)
    var maxLength = 450
    var shortNews = shortenString(scapedHtmlData, maxLength)
    $('#news').html(shortNews)
  }

  function responseFail (el) {
    el.html('Sorry we are having some techinal difficulties.')
  }

  function loadingResponse (el) {
    el.html('Loading...')
  }

  function fetchNews () {
    var urlNews = 'https://json-data.herokuapp.com/restaurant/news/1'
    $.get(urlNews).done(showNewsHtml).fail(responseFail)
  }

  // This shortens the text of the news post and adds ...read more
  function shortenString (string, maxLength) {
    if (string.length > maxLength) {
      // the substr extracts the part of the paragraph you don't want by specifing the max length.
      string = string.substr(0, maxLength) + '...' + '<a>read more</a>'
    }
    return string
  }

  loadingResponse($('#news'))

  THE_BLACK_POT.fetchNews = fetchNews
  THE_BLACK_POT.loadingResponse = loadingResponse
})()
