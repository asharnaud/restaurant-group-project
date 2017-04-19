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
function dataToEl (data) {
  $('#title').html(data.title + '  ' + data.date_published)
  $('#news').html(data.post)
}

function responseFail (el) {
  el.html('Oh no! Sorry, looks like something went wrong on our end.')
}

responseFail($('#news'))

var urlNews = 'https://json-data.herokuapp.com/restaurant/news/1'
$.get(urlNews, dataToEl).done(dataToEl).fail(responseFail)

// This retrieves the daily special api data and replaces the html of the today's special section with what is retrieved.
function dataToSpecial (data) {
  // console.log(data)
  $('#dailySpecial').html(data.menu_item_id)
}

responseFail($('#dailySpecial'))

var urlDailySpecial = 'https://json-data.herokuapp.com/restaurant/special/1'
$.get(urlDailySpecial, dataToSpecial).done(dataToSpecial).fail(responseFail)

// This retrieves the menu api data
var urlMenu = 'https://json-data.herokuapp.com/restaurant/menu/1'
$.get(urlMenu, renderMenu).done(dataToSpecial).fail(responseFail)

function renderMenu (data) {
  $('#menu').append('<h3>Appetizers</h3>')
  data.appetizers.forEach(function (item) {
    $('#menu').append(menuDataToHtml(item))
  })
  $('#menu').append('<h3>Entrees</h3>')
  data.entrees.forEach(function (item) {
    $('#menu').append(menuDataToHtml(item))
  })
  $('#menu').append('<h3>Sides</h3>')
  data.sides.forEach(function (item) {
    $('#menu').append(menuDataToHtml(item))
  })
}

function menuDataToHtml (food) {
  var element = ''
  element += '<h4 class="food-title">' + food.item + '</h4>'
  element += '<p class="food-description">' + food.description + '</p>'
  element += '<span>' + food.price + '</span>'
  element += '<div class="food-icon-wrapper">'
  element += '<i title="vegan" class="fa fa-leaf ' + checkIconStatus(food.vegan) + '">' + '</i>'
  element += '<i title="spicy" class="fa fa-thermometer-full ' + checkIconStatus(food.spicy) + '">' + '</i>'
  element += '<i title="allergies" class="fa fa-ambulance ' + checkIconStatus(food.allergies) + '">' + '</i>'
  element += '<i title="favorite" class="fa fa-star ' + checkIconStatus(food.favorite) + '">' + '</i>'
  element += '</div>'
  return element
}

function checkIconStatus (item) {
  if (item === 1) return 'active'
  return 'inactive'
}
