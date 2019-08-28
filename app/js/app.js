'use strict';

angular.module("App", [])
.controller("MyController", function($scope, $http) {
    $http.get('https://ghibliapi.herokuapp.com/films').
        then(function(response) {
            $scope.films = response.data;
        });
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   
        $scope.reverse = !$scope.reverse;
    }
});
