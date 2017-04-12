var albums = [];
var photos = {};

var concatLinks = function (links) {
  return links.map(function (link, i) {
    return "<a href='" + link + "' target='_blank' download=''>Photo#" + i + "</a>"
  }).join("<br>");
};

var addLinksToView = function (view, links) {
  linksAsString = "<p>" + concatLinks(links) + "</p>";
  view.append(linksAsString);
};

var loadAlbumsList = function () {
  VK.api("photos.getAlbums", function (data) {
    albums = data["response"]["items"];
    loadPhotos();
  })
};

var photoListingComplete = function () {
  var view = $(".raised");
  Object.keys(photos).forEach(function(key) {
    addLinksToView(view, photos[key]);
  });
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
  })
};

var success = function () {
  loadAlbumsList();
};

var error = function () {

};

VK.init(success, error, '5.63');

