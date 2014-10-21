angular.module('myApp.services', ['ngResource'])
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
})

.factory('Share', function($resource){
  var Share = $resource('/api/shares/:id.json',
      {id: '@id'},
      {}
    );
  return Share;
})

.factory("SessionService", function($http, $q){
  var service = {
    getCurrentUser: function() {
      if (service.isAuthenticated()) {
        return $q.when(service.currentUser);
      } else {
        return $http.get('/api/current_user').then(function(resp){
          return service.currentUser = resp.data;
        });
      }
    },
    currentUser: null,
    isAuthenticated: function(){
      return !!service.currentUser;
    }
  };
  return service;
});

