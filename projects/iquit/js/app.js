(function() {
  'use strict';
  var angular  = require('angular');
  var app = angular.module('iQuit', [require('angular-animate'),
                           require('angular-formly'),
                           require('angular-formly-templates-bootstrap'),],
                 function config(formlyConfigProvider){
                    // set templates here
                    formlyConfigProvider.setType({
                      name: 'custom',
                      templateUrl: 'custom.html'
                    });
                  });

  app.controller('mainCtrl', ["$scope", function($scope) {
    $scope.user = {}; // the model 'user'

  	$scope.userFields = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Your Name',
        placeholder: 'Michael Kang',
      }
    },
    {
      key: 'boss',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Boss',
        placeholder: 'John Doe',
      }
    },
    {
      key: 'company',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Company',
        placeholder: 'THE COMPANY',
      }
    },
    {
      key: 'time',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Time at Company',
        placeholder: '4 YEARS 3 MONTHS',
      }
    },
    {
      key: 'reason',
      type: 'textarea',
      templateOptions: {
        type: 'text',
        label: 'Reason',
        placeholder: "I DON'T CARE ABOUT WHAT I DO ANY MORE.",
      }
    },
 	]; // fields/keys we need in the model as a list


    // function definition
    function onSubmit(user) {

    }
    $scope.onSubmit = onSubmit;

  }]);

})();
