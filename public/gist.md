ctrl.linkExternal = function (url){
  $window.location.href = url;
}

.run(['$state',
      function($state) {
          $state.transitionTo('login');
}])


$scope.$watch(function() {
  if (!localStorageService.get('local')) {
    return false;
  }
  return true;
}, function(new_value, old_value){
  log(new_value)
  log(old_value)
}, true)
