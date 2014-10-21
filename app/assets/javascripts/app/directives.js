angular.module('myApp.directives', [])
.directive('isUserOrEmail', function($http, $timeout, $filter, $q){
  var isUser = function(input){
    var d = $q.defer();

    if (input) {
      $http({
        url: '/api/check/is_user',
        method: 'POST',
        data: { 'name': input}
      }).then(function(data){
        if (data.status == 200){
          d.resolve(data.data);
        }
        else {
          d.reject(data.data);
        }
      });
    } 
    else {
      d.reject("No input");
    }
    return d.promise;
  };
  var checking = null,
  emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, ele, attrs, ctrl) {
      scope.$watch(attrs.ngModel, function(v){
        if (checking) clearTimeout(checking);

        var value = scope.ngModel.$viewValue;

        checking = $timeout(function(){
          isUser(value).then(function(data) {
            if (data.success) {
              checking = null;
              ctrl.$setValidity('isUserOrEmail', true);
            } else {
              if (emailRegex.test(value)) {
                checking = null;
                ctrl.$setValidity('isUserOrEmail', true);
              }
              else {
                checking = null;
                ctrl.$setValidity('isUserOrEmail', false);
              }
            }
          });
        }, 200);
      });
    }
  };
})

