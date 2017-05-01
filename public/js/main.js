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

/* global THE_BLACK_POT */
;(function () {
  var $ = window.jQuery
  // This is the function that retrieves Flickr photos
  var FLICKR_API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e0de23a6e8692914d68addb1c4dab779&format=json&tags=creole?food&text=creole?food&nojsoncallback=?'
  function fetchFlickrImages () {
    console.info('Fetching Flickr images now.')
    $.get(FLICKR_API_URL)
      .done(fetchFlickrImagesSuccess)
      .fail(fetchFlickrImagesError)
  }
  function fetchFlickrImagesError () {
    var randomPhoto = 'http://lorempixel.com/600/400/food/'
    $('.header-img img').attr('src', randomPhoto)
    $('#dailySpecialImg').attr('src', randomPhoto)
    $('.side-photo').attr('src', randomPhoto)
  }

  function fetchFlickrImagesSuccess (data) {
    renderPicture(data, 32, '#img1')
    renderPicture(data, 31, '#img2')
    renderPicture(data, 29, '#img3')

    renderPicture(data, 13, '#dailySpecialImg')
    renderPicture(data, 44, '#storyImg')
    renderPicture(data, 5, '.side-photo-1')
    renderPicture(data, 30, '.side-photo-2')
    renderPicture(data, 14, '.side-photo-3')
  }

  function renderPicture (data, num, imgEl) {
    var photoId = data.photos.photo[num].id
    var photoFarmId = data.photos.photo[num].farm
    var photoServer = data.photos.photo[num].server
    var photoSecret = data.photos.photo[num].secret
    // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    var photoUrl = 'https://farm' + photoFarmId + '.staticflickr.com/' + photoServer + '/' + photoId + '_' + photoSecret + '.jpg'
    $(imgEl).attr('src', photoUrl)
    onLoadResizeSidebar(imgEl)
  }

  function onLoadResizeSidebar (img) {
    $(img).on('load', function () {
      THE_BLACK_POT.resizeSidebarHeight()
    })
  }

  THE_BLACK_POT.fetchFlickrImages = fetchFlickrImages
})()

/* global THE_BLACK_POT */
;(function () {
  var $ = window.jQuery
  var currentImgIdx = 0
  var slides = $('#slides img')

  function animateSlide () {
    $(slides[currentImgIdx]).fadeIn(1000, function () {
      $(this).delay(4000)
      .fadeOut(1000, checkCurrent)
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

/* global google */
;(function () {
  // The function to get the location for the Google map.
  function initMap () {
    var newOrleans = {lat: 30.0688, lng: -89.930881}
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: newOrleans
    })
    var marker = new google.maps.Marker({
      position: newOrleans,
      map: map
    })
    console.log(marker)
  }

  window.THE_BLACK_POT = window.THE_BLACK_POT || {}
  window.THE_BLACK_POT.initGoogleMap = initMap
})()

/* global THE_BLACK_POT */
;(function () {
  var $ = window.jQuery
  // This retrieves the news api data and replaces the html of the news section with what is retrieved.
  function showNewsHtml (data) {
    $('#title').html(THE_BLACK_POT.escapeHtml(data.title) + '  ' +
     THE_BLACK_POT.escapeHtml(data.date_published))

    $('#news').html(THE_BLACK_POT.escapeHtml(data.post))
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

/* global THE_BLACK_POT */
;(function () {
  var $ = window.jQuery
  // This retrieves the daily special api data and replaces the html of the today's special section with what is retrieved.
  function showDailySpecial (data) {
    var id = '#' + data.menu_item_id
    var menuItem = $(id)
    $('#dailySpecial').html(menuItem)
  }
  function responseFail (el) {
    el.html('Sorry we are having some techinal difficulties.')
  }

  responseFail($('#dailySpecial'))

  function fetchDailySpecial () {
    var urlDailySpecial = 'https://json-data.herokuapp.com/restaurant/special/1'
    $.get(urlDailySpecial).done(showDailySpecial).fail(responseFail)
  }

  window.THE_BLACK_POT = window.THE_BLACK_POT || {}
  THE_BLACK_POT.fetchDailySpecial = fetchDailySpecial
})()

/* global THE_BLACK_POT */
;(function () {
  var $ = window.jQuery
  // This is the API call for the restaurant menu
  function fetchMenu () {
    var urlMenu = 'https://json-data.herokuapp.com/restaurant/menu/1'
    $.get(urlMenu).done(renderMenu).fail(responseFail)
  }
  function responseFail (el) {
    el.html('Sorry we are having some techinal difficulties.')
  }
  // loops through the object and gets name and properties
  function renderMenu (data) {
    for (var item in data) {
      if (data.hasOwnProperty(item)) {
        createMenuItems(item, data[item])
      }
    }
  }

  // first uses the name to render the title, then loops through each element
  // on the menu and calls the function that returns the html menu elements
  function createMenuItems (name, arr) {
    name = escapeHtml(name)
    var title = '<h3>' + firstLetterToUpper(name) + '</h3> <hr>'
    $('#menu').append(title)
    arr.forEach(function (item) {
      $('#menu').append(menuDataToHtml(item))
    })
    THE_BLACK_POT.fetchDailySpecial()
  }

  // render html tags and css classes with the menu api content
  function menuDataToHtml (food) {
    var element = '<div id="' + food.id + '" class="food-wrapper">' +
      '<div class="food-title">' +
      '<h4>' + escapeHtml(food.item) + '</h4>' +
      '<span class="bar-menu">&#8226;</span>' +
      '<span class="price"> $' + food.price + ' </span>' +
      '<span class="bar-menu">&#8226;</span>' +
      '<div class="food-icon-wrapper">' +
      '<i title="vegan" class="fa fa-leaf ' + getClassActive(food.vegan) + '">' + '</i>' +
      '<i title="spicy" class="fa fa-thermometer-full ' + getClassActive(food.spicy) + '">' + '</i>' +
      '<i title="allergies" class="fa fa-ambulance ' + getClassActive(food.allergies) + '">' + '</i>' +
      '<i title="favorite" class="fa fa-star ' + getClassActive(food.favorite) + '">' + '</i>' +
      '</div>' +
      '</div>' +
      '<p class="food-description">' + escapeHtml(food.description) + '</p>' +
      '</div>'
    return element
  }

  function escapeHtml (unsafe) {
    if (typeof unsafe === 'string') {
      var safe = unsafe
       .replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#039;')
      return safe
    }
  }

  function getClassActive (item) {
    if (item === 1) return 'active'
    return 'inactive'
  }

  function firstLetterToUpper (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  THE_BLACK_POT.fetchMenu = fetchMenu
  THE_BLACK_POT.escapeHtml = escapeHtml
})()

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

;(function () {
  var $ = window.jQuery
  var THE_BLACK_POT = window.THE_BLACK_POT

  function globalInit () {
    THE_BLACK_POT.fetchFlickrImages()
    THE_BLACK_POT.fetchNews()
    THE_BLACK_POT.fetchDailySpecial()
    THE_BLACK_POT.fetchMenu()
    THE_BLACK_POT.initGoogleMap()
    THE_BLACK_POT.animateSlide()
  }

  $(globalInit)
})()
