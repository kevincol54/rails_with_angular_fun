angular.module('myApp.controllers', [])
.controller('HomeController', function($scope, ArticleService) {
  ArticleService.getLatestFeed()
  .then(function(data){
    $scope.articles = data;
  })
});