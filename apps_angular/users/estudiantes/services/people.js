angular.module('estudiantesApp').service('PeopleService', function($http) {
  var service = {
    getAllPeople: function() {
      return $http.get('./data/people.json').then(function(resp) {
        console.log(resp.data)
        return resp.data;
      });
    },

    getPerson: function(id) {
      function personMatchesParam(person) {
        return person.id === id;
      }

      return service.getAllPeople().then(function (people) {
        return people.find(personMatchesParam)
      });
    }
  }
  function getAllPeople() {
    return $http.get('./data/people.json').then(function(resp) {
      console.log(resp.data)
      return resp.data;
    });
  }

  return service;
})
