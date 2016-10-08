(function () {
'use strict';

angular.module('menuApp')
.controller('CategoriesListController', CategoriesListController);


CategoriesListController.$inject = ['items'];
function CategoriesListController(items) {
  var categoriesList = this;
  categoriesList.items = items;
}

})();
