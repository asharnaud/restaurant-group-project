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
// TODO: checl if you can do this with html data-
function toggleTabs (e) {
  if (e.target.id === 'btnReservation') {
    $('#menu').hide()
    $('#story').hide()
    $('#reservation').show()
  }
}

$('#menu').hide()
$('#reservation').hide()
