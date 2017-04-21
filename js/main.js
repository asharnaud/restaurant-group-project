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
}

// This retrieves the news api data and replaces the html of the news section with what is retrieved.
function dataToNews (data) {
  $('#title').html(data.title + '  ' + data.date_published)
  $('#news').html(data.post)
}

function responseFail (el) {
  el.html('Oh no! Sorry, looks like something went wrong on our end.')
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
  var element = ''
  element += '<div id="' + food.id + '" class="food-wrapper">'
  element += '<div class="food-title">'
  element += '<h4>' + food.item + '</h4>'
  element += '<span class="price"> $' + food.price + '</span>'
  element += '</div>'
  element += '<p class="food-description">' + food.description + '</p>'
  element += '<div class="food-icon-wrapper">'
  element += '<i title="vegan" class="fa fa-leaf ' + checkIconStatus(food.vegan) + '">' + '</i>'
  element += '<i title="spicy" class="fa fa-thermometer-full ' + checkIconStatus(food.spicy) + '">' + '</i>'
  element += '<i title="allergies" class="fa fa-ambulance ' + checkIconStatus(food.allergies) + '">' + '</i>'
  element += '<i title="favorite" class="fa fa-star ' + checkIconStatus(food.favorite) + '">' + '</i>'
  element += '</div>'
  element += '</div>'
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
$('.tabs-menu').click(toggleTabs)
function toggleTabs (e) {
  // checks if the element clicked has the class 'tabs'
  if (e.target.classList.contains('tabs')) {
    // takes the data att name from the btn and creates an id
    var idName = '#' + e.target.dataset.btn
    $('#menu, #story, #reservation, #reviews').hide()
    $(idName).show()
    getTabContentWidth($(idName))
  }
}

$('#menu, #reservation, #reviews').hide()

// This is the function that retrieves Flickr photos

var apiurl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e0de23a6e8692914d68addb1c4dab779&format=json&tags=creole?food&text=creole?food&nojsoncallback=?'
$.get(apiurl).done(jsonFlickrApi).fail(function (e) {
  console.log('bad', e)
})

function jsonFlickrApi (data) {
  console.log(data)
  renderPicture(data, 32, '.header-img img')
  renderPicture(data, 13, '#daily-special-img')
  renderPicture(data, 5, '.side-photo-1')
  renderPicture(data, 12, '.side-photo-2')
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

function getTabContentWidth (element) {
  var height = element.height()
  console.log(height)
}
