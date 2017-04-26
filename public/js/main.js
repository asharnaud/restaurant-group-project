/* global google */
var $ = window.jQuery
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
console.log(initMap)

// This retrieves the news api data and replaces the html of the news section with what is retrieved.
function dataToNews (data) {
  $('#title').html(data.title + '  ' + data.date_published)
  $('#news').html(data.post)
  $('#news').html(shortenText('#news', 450))
}

function responseFail (el) {
  console.log('Oh no! Sorry...')
}

responseFail($('#news'))

var urlNews = 'https://json-data.herokuapp.com/restaurant/news/1'
$.get(urlNews).done(dataToNews).fail(responseFail)

// This retrieves the daily special api data and replaces the html of the today's special section with what is retrieved.
function dataToSpecial (data) {
  var id = '#' + data.menu_item_id
  var menuItem = $(id)
  $('#dailySpecial').html(menuItem)
}

responseFail($('#dailySpecial'))

function callDailySpecial () {
  var urlDailySpecial = 'https://json-data.herokuapp.com/restaurant/special/1'
  $.get(urlDailySpecial).done(dataToSpecial).fail(responseFail)
}

// This is the API call for the restaurant menu
var urlMenu = 'https://json-data.herokuapp.com/restaurant/menu/1'
$.get(urlMenu).done(renderMenu).fail(responseFail)

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
function createMenuItems (name, obj) {
  var title = '<h3>' + firstLetterToUpper(name) + '</h3> <hr>'
  $('#menu').append(title)
  obj.forEach(function (item) {
    $('#menu').append(menuDataToHtml(item))
  })
  callDailySpecial()
}

// render html tags and css classes with the menu api content
function menuDataToHtml (food) {
  var element = '<div id="' + food.id + '" class="food-wrapper">' +
    '<div class="food-title">' +
    '<h4>' + food.item + '</h4>' +
    '<span class="bar-menu">&#8226;</span>' +
    '<span class="price"> $' + food.price + ' </span>' +
    '<span class="bar-menu">&#8226;</span>' +
    '<div class="food-icon-wrapper">' +
    '<i title="vegan" class="fa fa-leaf ' + checkIconStatus(food.vegan) + '">' + '</i>' +
    '<i title="spicy" class="fa fa-thermometer-full ' + checkIconStatus(food.spicy) + '">' + '</i>' +
    '<i title="allergies" class="fa fa-ambulance ' + checkIconStatus(food.allergies) + '">' + '</i>' +
    '<i title="favorite" class="fa fa-star ' + checkIconStatus(food.favorite) + '">' + '</i>' +
    '</div>' +
    '</div>' +
    '<p class="food-description">' + food.description + '</p>' +
    '</div>'
  return element
}

function checkIconStatus (item) {
  if (item === 1) return 'active'
  return 'inactive'
}

function firstLetterToUpper (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// toggle tabs
$('.tabs-menu .tabs').click(toggleTabs)

function toggleTabs (e) {
  // toggles class 'active' in btn tabs
  $('.tabs-menu .tabs').removeClass('active')
  $(this).addClass('active')
  // takes the data att name from the btn and creates an id
  var idName = '#' + e.target.dataset.btn
  $('#menu, #story, #reservation, #reviews, #shop').hide()
  $(idName).show()
  setSidebarHeight($(idName))
}

// hides the tabs content
$('#menu, #reservation, #reviews, #shop').hide()

// This gets the height of the story tab content and makes the photo side column the same height.
function setSidebarHeight (element) {
  var height = element.height()
  console.log(height)
  $('.photo-side-column').height(height)
}

// This shortens the text of the news post and adds ...read more
function shortenText (selector, maxLength) {
  var element = $(selector)
  var newsPost = element.html()
  if (newsPost.length > maxLength) {
    // the substr extracts the part of the paragraph you don't want by specifing the max length.
    newsPost = newsPost.substr(0, maxLength) + '...' + '<a>read more</a>'
  }
  return newsPost
}

// checks active tab content evey 200 ms and resize sidebar
function resizeActive () {
  var activeTab = $('.tabs-menu .active')[0]
  var contentTab = activeTab.dataset.btn
  var contentId = '#' + contentTab
  setSidebarHeight($(contentId))
}

setInterval(resizeActive, 200)

// This is the function that retrieves Flickr photos
var $ = window.jQuery

var apiurl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e0de23a6e8692914d68addb1c4dab779&format=json&tags=creole?food&text=creole?food&nojsoncallback=?'
$.get(apiurl).done(jsonFlickrApi).fail(function (e) {
  console.log('bad', e)
})

function jsonFlickrApi (data) {
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
}

var $ = window.jQuery

var current = 0
var slides = $('#slides img')

function animateSlide () {
  $(slides[current]).fadeIn(1000, function () {
    $(this).delay(4000).fadeOut(1000, checkCurrent)
  })
}

function checkCurrent () {
  current++
  if (current === slides.length) {
    current = 0
  }
  animateSlide()
}

slides.hide()
animateSlide()
