/* global THE_BLACK_POT */
;(function () {
  var $ = window.jQuery
  // This is the function that retrieves Flickr photos
  var FLICKR_API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e0de23a6e8692914d68addb1c4dab779&format=json&tags=creole?food&text=creole?food&nojsoncallback=?'
  function fetchFlickrImages () {
    console.info('Fetching Flickr images now.')
    $.get(FLICKR_API_URL)
      .done(fetchFlickrImagesSuccess)
      .fail(fetchFlickrImagesError)
  }
  function fetchFlickrImagesError () {
    var randomPhoto = 'http://lorempixel.com/600/400/food/'
    $('.header-img img').attr('src', randomPhoto)
    $('#dailySpecialImg').attr('src', randomPhoto)
    $('.side-photo').attr('src', randomPhoto)
  }

  function fetchFlickrImagesSuccess (data) {
    renderPicture(data, 32, '#img1')
    renderPicture(data, 31, '#img2')
    renderPicture(data, 29, '#img3')

    renderPicture(data, 13, '#dailySpecialImg')
    renderPicture(data, 44, '#storyImg')
    renderPicture(data, 5, '.side-photo-1')
    renderPicture(data, 30, '.side-photo-2')
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
    onLoadResizeSidebar(imgEl)
  }

  function onLoadResizeSidebar (img) {
    $(img).on('load', function () {
      THE_BLACK_POT.resizeSidebarHeight()
    })
  }

  THE_BLACK_POT.fetchFlickrImages = fetchFlickrImages
})()
