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
    $('#img1').attr('src', getImgSrc(data, 32))
    $('#img2').attr('src', getImgSrc(data, 31))
    $('#img3').attr('src', getImgSrc(data, 29))

    $('#dailySpecialImg').attr('src', getImgSrc(data, 13))
    $('#storyImg').attr('src', getImgSrc(data, 44))

    $('.side-photo-1').attr('src', getImgSrc(data, 75))
    $('.side-photo-2').attr('src', getImgSrc(data, 30))
    $('.side-photo-3').attr('src', getImgSrc(data, 14))
    $('.side-photo-4').attr('src', getImgSrc(data, 5))
    $('.side-photo-5').attr('src', getImgSrc(data, 13))
    $('.side-photo-6').attr('src', getImgSrc(data, 1))
    $('.side-photo-7').attr('src', getImgSrc(data, 4))
    $('.side-photo-8').attr('src', getImgSrc(data, 36))
    $('.side-photo-9').attr('src', getImgSrc(data, 28))
    $('.side-photo-10').attr('src', getImgSrc(data, 40))
    $('.side-photo-11').attr('src', getImgSrc(data, 13))
    $('.side-photo-12').attr('src', getImgSrc(data, 5))
    $('.side-photo-13').attr('src', getImgSrc(data, 34))
    $('.side-photo-14').attr('src', getImgSrc(data, 29))
  }

  function getImgSrc (arr, num) {
    var photo = arr.photos.photo
    // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    var photoUrl = 'https://farm' + photo[num].farm + '.staticflickr.com/' +
     photo[num].server + '/' + photo[num].id + '_' + photo[num].secret + '.jpg'

    return photoUrl
  }

  window.THE_BLACK_POT = window.THE_BLACK_POT || {}
  THE_BLACK_POT.fetchFlickrImages = fetchFlickrImages
})()

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

  window.THE_BLACK_POT = window.THE_BLACK_POT || {}
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
    var scapedHtmlData = THE_BLACK_POT.escapeHtml(data.post)
    var maxLength = 450
    var shortNews = shortenString(scapedHtmlData, maxLength)
    $('#news').html(shortNews)
  }

  function responseFail () {
    $('#news').html('Sorry we are having some techinal difficulties.')
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

/* global THE_BLACK_POT */
;(function () {
  var $ = window.jQuery
  // This is the API call for the restaurant menu
  function fetchMenu () {
    var urlMenu = 'https://json-data.herokuapp.com/restaurant/menu/1'
    $.get(urlMenu).done(renderMenu).fail(responseFail)
  }

  function responseFail (el) {
    $('#menu').html('Sorry we are having some techinal difficulties.')
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
    var menu = '<h3>' + firstLetterToUpper(escapeHtml(name)) + '</h3> <hr>'

    arr.forEach(function (item) {
      menu += menuDataToHtml(item)
    })

    $('#menu').append(menu)

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
    return unsafe
       .replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#039;')
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
    $('#menu, #story, #reservation, #reviews, #shop, #photos').hide()
    $(idName).fadeToggle()

    THE_BLACK_POT.resizeSidebarHeight()
  }

  // hides the tabs content
  $('#menu, #reservation, #reviews, #shop, #photos').hide()
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
