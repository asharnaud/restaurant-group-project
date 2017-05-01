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
