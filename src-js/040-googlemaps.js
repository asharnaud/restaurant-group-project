/* global google */
;(function () {
  // The function to get the location for the Google map.
  var map
  window.map = function initMap () {
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
  console.log(map)
})()
