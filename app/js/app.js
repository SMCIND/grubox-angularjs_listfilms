'use strict';

angular.module("App", [])
.controller("MyController", function($scope, $http) {
    $http.get('https://ghibliapi.herokuapp.com/films').
        then(function(response) {
            $scope.films = response.data;
        });
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
});
