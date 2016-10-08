(function () {
'use strict';

angular.module('menuApp')
.service('CategoriesListService', CategoriesListService);


CategoriesListService.$inject = ['$q', '$timeout', '$http']
function CategoriesListService($q, $timeout, $http) {
  var service = this;

  // List of shopping items
  var items = [];

  $http.get("https://davids-restaurant.herokuapp.com/categories.json")
      .then( function(response) {
          items = response.data;           
        });

  service.getCats = function () {
    var deferred = $q.defer();

    // Wait 2 seconds before returning
    $timeout(function () {
      // deferred.reject(items);
      deferred.resolve(items);
    }, 300);

    return deferred.promise;
  };


}

})();
