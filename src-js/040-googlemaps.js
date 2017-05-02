/* global google */
;(function () {
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

  window.THE_BLACK_POT = window.THE_BLACK_POT || {}
  window.THE_BLACK_POT.initGoogleMap = initMap
})()
