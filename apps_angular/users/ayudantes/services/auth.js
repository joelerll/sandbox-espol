angular.module('ayudantesApp').service('auth', authentication);

authentication.$inject = ['$http', '$window','jwtHelper'];

function authentication ($http, $window,jwtHelper) {

  var saveToken = function (token) {
    if ( token ) {
        console.log(jwtHelper.getTokenExpirationDate(token))
        $window.localStorage.setItem('ayudantes', token);
    }
  };

  var getToken = function () {
    return $window.localStorage.getItem('ayudantes');
  };

  var login = function(ayudante, cb) {
    return $http.post('/api/v1/ayudantes/login', ayudante).then(function(data) {
        saveToken(data.data.token);
        cb(data.data);
    },function errorCallback(response) {
        cb(null);
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
    $window.localStorage.removeItem('ayudantes');
  };

  function parseJwt () {
            var base64Url = getToken().split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
  };

  return {
    saveToken : saveToken,
    getToken : getToken,
    login : login,
    isLoggedIn: isLoggedIn,
    logout : logout,
    parseJwt: parseJwt
  };
}
