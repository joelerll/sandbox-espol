angular
  .module('appAdmin')
  .service('ProfesoresService', ProfesoresService);

ProfesoresService.$inyect = ['$http','auth'];

function ProfesoresService ($http,auth) {
  var getAllProfesores = function() {
    $http.get('/api/v1/profesores',
                {headers: {'Authorization': auth.getToken()}})
                .then(function(res) {
                  console.log(res.data)
                    return res.data
          })
    };

    return {
      getAllProfesores: getAllProfesores
    }
}
