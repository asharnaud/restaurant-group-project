/* global THE_BLACK_POT */
;(function () {
  var $ = window.jQuery
  window.THE_BLACK_POT = window.THE_BLACK_POT || {}

  // This gets the height of the story tab content and makes the photo side column the same height.
  function setSidebarHeight (element) {
    var height = element.height()
    $('.photo-side-column').height(height)
  }

  // checks active tab content evey 200 ms and resize sidebar
  function resizeSidebarHeight () {
    var activeTab = $('.tabs-menu .active')[0]
    var contentTab = activeTab.dataset.btn
    var contentId = '#' + contentTab
    setSidebarHeight($(contentId))
  }

  var RESIZE_POLLING_RATE_MS = 200
  setInterval(resizeSidebarHeight, RESIZE_POLLING_RATE_MS)

  THE_BLACK_POT.setSidebarHeight = setSidebarHeight
})()
