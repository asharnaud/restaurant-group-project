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
  function createMenuItems (name, obj) {
    var title = '<h3>' + firstLetterToUpper(name) + '</h3> <hr>'
    $('#menu').append(title)
    obj.forEach(function (item) {
      $('#menu').append(menuDataToHtml(item))
    })
    THE_BLACK_POT.callDailySpecial()
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
  THE_BLACK_POT.fetchMenu = fetchMenu
})()
