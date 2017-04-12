
var albums = [];

var loadAlbumsList = function () {

  VK.api("photos.getAlbums", function (data) {
    console.log(albums);
    albums = data["response"];
    loadPhotos();
  })
};

var loadPhotos = function () {
  albums.forEach(function (album) {
    console.log(album)
  })
};

var success = function () {
  loadAlbumsList();
};

var error = function () {

};

VK.init(success, error, '5.63');

