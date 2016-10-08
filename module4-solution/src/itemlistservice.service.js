(function () {
'use strict';

angular.module('menuApp')
.service('ItemListService', ItemListService);


ItemListService.$inject = ['$q', '$timeout', '$http']
function ItemListService($q, $timeout, $http) {
  var service = this;

  // List of shopping items
  var items = [];
 
  service.getItems = function (shortName) { 
   $http.get('https://davids-restaurant.herokuapp.com/menu_items.json?category='+shortName)
      .then( function(response) {
          items = response.data;          
        });

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