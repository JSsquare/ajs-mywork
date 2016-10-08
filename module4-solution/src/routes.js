(function () {
'use strict';

angular.module('menuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

 .state('home', {
    url: '/',
    templateUrl: 'src/template/home.template.html'
  })

 .state('categoriesList', {
    url: '/categories-list',
    templateUrl: 'src/template/categorieslist.template.html',
    controller: 'CategoriesListController as categoriesList',
    resolve: {
      items: ['CategoriesListService', function (CategoriesListService) {                
        return CategoriesListService.getCats();
      }]
    }
    
  })


  .state('itemList', {
    url: '/item-list/{shortName}',
    templateUrl: 'src/template/itemlist.template.html',
    controller: 'ItemListController as itemDetail',
    resolve: {
      item: ['$stateParams', 'ItemListService',
            function ($stateParams, ItemListService) {
              return ItemListService.getItems($stateParams.shortName);
                
            }]
    }
  });



}

})();