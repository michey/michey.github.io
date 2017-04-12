
var id = 0;
var albums = [];

var getId = function() {
  VK.api("users.get", function (data) {
    id = data["response"][0]["id"];
    loadAlbumsList();
  })
};

var loadAlbumsList = function () {
  VK.api("photos.getAlbums", {"owner_id": id}, function (data) {
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
  getId();
};

var error = function () {

};

VK.init(success, error, '5.63');

