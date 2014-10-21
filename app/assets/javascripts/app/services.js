angular.module('myApp.services', [])
.factory('ArticleService', function($http, $q){
  var service = {
    getLatestFeed: function() {
      var d = $q.defer();

      $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load' +
            '?v=1.0&num=50&callback=JSON_CALLBACK&q='+
            encodeURIComponent(
              'http://feeds.huffingtonpost.com/huffingtonpost/raw_feed'
            )
          ).then(function(data, status) {
            if (data.status === 200)
              d.resolve(data.data.responseData.feed.entries);
            else
              d.reject(data);
          });
          return d.promise;
    }
  };
  return service;
});