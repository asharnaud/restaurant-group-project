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
    $('#img1').attr('src', getImgSrc(data, 32))
    $('#img2').attr('src', getImgSrc(data, 31))
    $('#img3').attr('src', getImgSrc(data, 29))

    $('#dailySpecialImg').attr('src', getImgSrc(data, 13))
    $('#storyImg').attr('src', getImgSrc(data, 44))

    $('.side-photo-1').attr('src', getImgSrc(data, 75))
    $('.side-photo-2').attr('src', getImgSrc(data, 30))
    $('.side-photo-3').attr('src', getImgSrc(data, 14))
    $('.side-photo-4').attr('src', getImgSrc(data, 5))
    $('.side-photo-5').attr('src', getImgSrc(data, 13))
    $('.side-photo-6').attr('src', getImgSrc(data, 1))
    $('.side-photo-7').attr('src', getImgSrc(data, 4))
    $('.side-photo-8').attr('src', getImgSrc(data, 36))
    $('.side-photo-9').attr('src', getImgSrc(data, 28))
    $('.side-photo-10').attr('src', getImgSrc(data, 40))
    $('.side-photo-11').attr('src', getImgSrc(data, 13))
    $('.side-photo-12').attr('src', getImgSrc(data, 5))
    $('.side-photo-13').attr('src', getImgSrc(data, 34))
    $('.side-photo-14').attr('src', getImgSrc(data, 29))

    onLoadResizeSidebar('#dailySpecialImg')
  }

  function getImgSrc (arr, num) {
    var photo = arr.photos.photo

    // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    var photoUrl = 'https://farm' + photo[num].farm + '.staticflickr.com/' +
     photo[num].server + '/' + photo[num].id + '_' + photo[num].secret + '.jpg'

    return photoUrl
  }

  function onLoadResizeSidebar (img) {
    $(img).on('load', function () {
      // THE_BLACK_POT.resizeSidebarHeight()
    })
  }

  THE_BLACK_POT.fetchFlickrImages = fetchFlickrImages
})()
