var albums = [];
var photos = {};

var concatLinks = function (links) {
  return links.map(function (link, i) {
    return "<a href='" + link + "' download='Photo" + i + ".jpg' type='image/jpeg'>Photo#" + i + "</a>"
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
  if (data && data["response"] && data["response"] ) {
    var items = data["response"]["items"];
    photos[title] = items.map(function (ph) {
      var keys = Object.keys(ph).map(function (key) {
        if(key.indexOf("photo_") !== -1 ) {
          var parts = key.split("photo_");
          return parts[1];
        } else {
        return undefined;
        }
      }).filter(function(item) {
        return item !== undefined;
      }).sort(function(a, b) {
        return a - b;
      });
      console.log("keys" + keys);
      var actualKey = "photo_" + keys[keys.length - 1];
      console.log("actualKey" + actualKey);
      return ph[actualKey];
      
    });
    if (Object.keys(photos).length === albums.length) {
      photoListingComplete();
    }
  } else {
    photos[title] = [];
    console.log(data);
  }
};

var getPhoto = function (albumId, title) {
  VK.api("photos.get", {"album_id": albumId}, function (data) {
    handleResponse(data, title);
  })
};

var loadPhotos = function () {
  albums.forEach(function (album, idx) {
    var id = album["id"];
    var title = album["title"];
    setTimeout(function() {
      getPhoto(id, title);
    }, 500 * idx)
  })
};

var success = function () {
  loadAlbumsList();
};

var error = function () {

};

VK.init(success, error, '5.63');

