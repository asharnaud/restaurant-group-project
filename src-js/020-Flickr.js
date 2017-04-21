// This is the function that retrieves Flickr photos
var apiurl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e0de23a6e8692914d68addb1c4dab779&format=json&tags=creole?food&text=creole?food&nojsoncallback=?'
$.get(apiurl).done(jsonFlickrApi).fail(function (e) {
  console.log('bad', e)
})

function jsonFlickrApi (data) {
  console.log(data)
  renderPicture(data, 32, '.header-img img')
  renderPicture(data, 96, '.side-photo-1')
  renderPicture(data, 97, '.side-photo-2')
  renderPicture(data, 98, '.side-photo-3')
}

function renderPicture (data, num, imgEl) {
  var photoId = data.photos.photo[num].id
  var photoFarmId = data.photos.photo[num].farm
  var photoServer = data.photos.photo[num].server
  var photoSecret = data.photos.photo[num].secret
  // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
  var photoUrl = 'https://farm' + photoFarmId + '.staticflickr.com/' + photoServer + '/' + photoId + '_' + photoSecret + '.jpg'
  $(imgEl).attr('src', photoUrl)
}

function getTabContentWidth (element) {
  var height = element.height()
  console.log(height)
}

