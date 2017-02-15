angular.module('adminApp').service('auth', authentication);

authentication.$inject = ['$http', '$window'];

function authentication ($http, $window) {

  var saveToken = function (token) {
    if ( token ) {
        $window.localStorage.setItem('local', token);
    }
  };

  var getToken = function () {
    return $window.localStorage.getItem('local');
  };

  var login = function(admin, cb) {
    return $http.post('/api/v1/admin/login', admin).then(function(data) {
        saveToken(data.data.token);
        cb(null);
    },function errorCallback(response) {
        cb(response.data);
    })
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

  var logout = function() {
    $window.localStorage.removeItem('local');
  };

  return {
    saveToken : saveToken,
    getToken : getToken,
    login : login,
    isLoggedIn: isLoggedIn,
    logout : logout
  };
}
