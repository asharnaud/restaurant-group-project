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
  getTabContentHeight($(idName))
}

// hides the tabs content
$('#menu, #reservation, #reviews, #shop').hide()

// This gets the height of the story tab content and makes the photo side column the same height.
function getTabContentHeight (element) {
  var height = element.height()
  console.log(height)
  $('.photo-side-column').height(height)
}

// Anytime the window is resized this runs the getTabContentHeight function again to resize the side photo column.
$(window).resize(getTabContentHeight($('#story')))
