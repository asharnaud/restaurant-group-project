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

// This retrieves the news api and replaces the html of the news section with what is retrieved.
$.get('https://json-data.herokuapp.com/restaurant/news/1', function (data) {
  $('#title').html(data.title + '  ' + data.date_published)
  $('.latest-news p').html(data.post)
})
.fail(function () {
  $('.latest-news p').html('Oh no! Sorry, looks like something went wrong on our end.')
})
