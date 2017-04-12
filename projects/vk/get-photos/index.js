var albums = [];
var photos = {};

var concatLinks = function (links) {
  return links.map(function (link, i) {
    return "<a href='" + link + "' target='_blank' download=''>Photo#" + i + "</a>"
  }).join("<br>");
};

var addLinksToView = function (view, title, links) {
  linksAsString = "<p>" + title + "<br>" + concatLinks(links) + "</p>";
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
  Object.keys(photos).forEach(function (key) {
    addLinksToView(view, key, photos[key]);
  });
  console.log(photos);
};

var handleResponse = function (data, title) {
  var items = data["response"]["items"];
  photos[title] = items.map(function (ph) {
    return ph["photo_2560"];
  });
  if (Object.keys(photos).length === albums.length) {
    photoListingComplete();
  }

};

var getPhoto = function (albumId, title) {
  VK.api("photos.get", {"album_id": albumId}, function (data) {
    handleResponse(data, title);
  })
};

var loadPhotos = function () {
  albums.forEach(function (album) {
    var id = album["id"];
    var title = album["title"];
    getPhoto(id, title);
  })
};

var success = function () {
  loadAlbumsList();
};

var error = function () {

};

VK.init(success, error, '5.63');

