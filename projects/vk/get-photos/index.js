var albums = [];
var photos = {};

var loadAlbumsList = function () {

  VK.api("photos.getAlbums", function (data) {
    console.log(albums);
    albums = data["response"]["items"];
    loadPhotos();
  })
};


var photoListingComplete = function () {
  console.log(photos);
};

var handleResponse = function (data, albumId) {
  var items = data["response"]["items"];
  photos[albumId] = items.map(function (ph) {
    return ph["photo_2560"];
  });
  if (Object.keys(photos).length === albums.length) {
    photoListingComplete();
  }

};

var getPhoto = function (albumId) {
  VK.api("photos.get", {"album_id": albumId}, function (data) {
    handleResponse(data, albumId);
  })
};

var loadPhotos = function () {
  albums.forEach(function (album) {
    var id = album["id"];
    getPhoto(id);
    console.log(album)
  })
};

var success = function () {
  loadAlbumsList();
};

var error = function () {

};

VK.init(success, error, '5.63');

