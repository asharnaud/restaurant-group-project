/* global THE_BLACK_POT */
;(function () {
  var $ = window.jQuery
  // This retrieves the news api data and replaces the html of the news section with what is retrieved.
  function showNewsHtml (data) {
    $('#title').html(data.title + '  ' + data.date_published)
    $('#news').html(data.post)
    $('#news').html(shortenNewsText('#news', 450))
  }

  function responseFail (el) {
    el.html('Sorry we are having some techinal difficulties.')
  }

  responseFail($('#news'))
  function fetchNews () {
    var urlNews = 'https://json-data.herokuapp.com/restaurant/news/1'
    $.get(urlNews).done(showNewsHtml).fail(responseFail)
  }
  // This shortens the text of the news post and adds ...read more
  function shortenNewsText (selector, maxLength) {
    var element = $(selector)
    var newsPost = element.html()
    if (newsPost.length > maxLength) {
      // the substr extracts the part of the paragraph you don't want by specifing the max length.
      newsPost = newsPost.substr(0, maxLength) + '...' + '<a>read more</a>'
    }
    return newsPost
  }
  THE_BLACK_POT.fetchNews = fetchNews
})()
