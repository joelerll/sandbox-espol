angular.module('appAdmin').
  controller('AdminController', AdminController)

  AdminController.$inyect = ['$scope', '$http', '$window','auth','$location'];
  function AdminController($scope, $http, $window,auth,$location) {
    var ctrl = this;

    // models admin
    ctrl.admin = {
      username: '',
      password: ''
    };

    //messages alerts
    ctrl.alerts = [];

    var cleanAlerts = function() {
      ctrl.alerts = [];
    }

    ctrl.addAlert = function() {
      ctrl.alerts.push({msg: 'Another alert!'});
    };

    ctrl.closeAlert = function(index) {
      ctrl.alerts.splice(index, 1);
    };

    // keyboard
    ctrl.onKeyPress = function ($event) {
      if ( (window.event ? $event.keyCode : $event.which) == 13 ) {
        cleanAlerts();
        ctrl.login();
      }
    };

    // submit
    ctrl.login = function() {
      cleanAlerts();
      if( !ctrl.admin.password && !ctrl.admin.username ) {
        ctrl.alerts.push({type: 'danger', msg: 'username y password vacio'});
      } else if ( !ctrl.admin.password ) {
        ctrl.alerts.push({type: 'danger', msg: 'password vacio'});
      } else if ( !ctrl.admin.username) {
        ctrl.alerts.push({type: 'danger', msg: 'username vacio'});
      } else {
        auth.login(ctrl.admin, function(res) {
          if(!res) {
            $location.path('/dashboard');
          } else {
            ctrl.alerts.push({type: 'danger', msg: res.message});
          }
        })
      }
    }
  }
