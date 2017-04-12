var getId = function() {
  VK.api("users.get", function (data) {
    console.log(data);
  })
};

var loadAlbumsList = function () {

};

var success = function () {
  getId();
};

var error = function () {

};

VK.init(success, error, '5.63');

