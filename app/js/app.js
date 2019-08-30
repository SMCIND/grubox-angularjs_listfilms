'use strict';

angular.module("App", [])
.controller("MyController", function($scope, $http) {
    $scope.all_films = [];
    $scope.films_copy = [];
    $scope.films = [];
    $http.get('https://ghibliapi.herokuapp.com/films').
        then(function(response) {
            $scope.dictfilms = response.data;
            // creating dictionary for the api data if required in future
            for (var item in $scope.dictfilms) {
                var dictx={}
                dictx.title= $scope.dictfilms[item].title
                dictx.description= $scope.dictfilms[item].description
                dictx.release_date= $scope.dictfilms[item].release_date
                dictx.director= $scope.dictfilms[item].director
                dictx.producer= $scope.dictfilms[item].producer
                dictx.rt_score= $scope.dictfilms[item].rt_score
                $scope.films_copy.push(dictx)
            }
            $scope.all_films = $scope.films_copy;
            $scope.films = $scope.all_films;
            
        });
    // methods used for sorting    
    $scope.sort = function(keyname){
        $scope.keyname = keyname;
        $scope.reverse = !$scope.reverse;
        $scope.sorted_films = $scope.films_copy.sort($scope.sorta(keyname));
        $scope.all_films = $scope.sorted_films;
        $scope.films = $scope.sorted_films;
      }
    $scope.sorta = function(property){
        var sortOrder = 1;
    
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
    
        return function (a,b) {
            if(sortOrder == -1){
                return b[property].localeCompare(a[property]);
            }else{
                return a[property].localeCompare(b[property]);
            }        
        }
    }

    // methods used for filtering
    $scope.filter_title_director = function(){
      var keyword =document.getElementById('search_input').value;
      $scope.filtered_films = $scope.films_copy.filter(function(film) {
        return film.title.toLowerCase().includes(keyword.toLowerCase()) || film.director.toLowerCase().includes(keyword.toLowerCase());
      });
      $scope.all_films = $scope.filtered_films;
      $scope.films = $scope.filtered_films;
    }
    // methods to implement lazy loading
    $scope.totalDisplayed = 5;
    $scope.loadMore = function () {
      if($scope.totalDisplayed<$scope.all_films.length){
      $scope.totalDisplayed = $scope.totalDisplayed + 5;  
      }
    };

    
});