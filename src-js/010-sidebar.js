/* global THE_BLACK_POT */
;(function () {
  var $ = window.jQuery
  window.THE_BLACK_POT = window.THE_BLACK_POT || {}

  // This gets the height of the story tab content and makes the photo side column the same height.
  function setSidebarHeight (element) {
    var height = element.height()
    $('.photo-side-column').height(height)
  }

  function resizeSidebarHeight () {
    var activeTab = $('.tabs-menu .active')[0]
    var contentTab = activeTab.dataset.btn
    var contentId = '#' + contentTab
    setSidebarHeight($(contentId))
  }

  THE_BLACK_POT.resizeSidebarHeight = resizeSidebarHeight
})()
