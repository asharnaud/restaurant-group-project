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

function responseFail () {
  $('#news').html('Oh no! Sorry, looks like something went wrong on our end.')
}

var url = 'https://json-data.herokuapp.com/restaurant/news/1'
apiCall = $.get(url, dataToEl).done(dataToEl).fail(responseFail)

// This retrieves the daily special api data and replaces the html of the today's special section with what is retrieved.
function dataToSpecial (data) {
  console.log(data)
  $('#dailySpecial').html(data.menu_item_id)
}

function responseFailSpecial () {
  $('#dailySpecial').html('Oh no! Sorry, looks like something went wrong on our end.')
}

var specialURL = 'https://json-data.herokuapp.com/restaurant/special/1'
speicalApiCall = $.get(specialURL, dataToSpecial).done(dataToSpecial).fail(responseFailSpecial)
