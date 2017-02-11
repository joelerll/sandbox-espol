angular
  .module('appAdmin')
  .service('auth', authentication);

authentication.$inject = ['$http', '$window','jwtHelper'];
function authentication ($http, $window, jwtHelper) {

  var saveToken = function (token) {
    if ( token ) {
        $window.localStorage.setItem('local', token);
    }
  };

  var getToken = function () {
    return $window.localStorage.getItem('local');
  };

  var isLoggedIn = function() {
    var token = getToken();

    if(token){
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  var currentUser = function() {
    if(isLoggedIn()){
      var token = getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return {
        username : payload.username,
      };
    }
  };

  var login = function(admin, cb) {
    return $http.post('/api/v1/admin/login', admin).then(function(data) {
        saveToken(data.data.token);
        cb(null);
    },function errorCallback(response) {
        cb(response.data);
    })
  };

  var logout = function() {
    $window.localStorage.removeItem('local');
  };

  return {
    currentUser : currentUser,
    saveToken : saveToken,
    getToken : getToken,
    isLoggedIn : isLoggedIn,
    login : login,
    logout : logout
  };
}
