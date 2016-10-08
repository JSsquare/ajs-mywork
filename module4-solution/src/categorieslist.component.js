(function () {
'use strict';

angular.module('menuApp')
.component('categoriesList', {
  templateUrl: 'src/template/allcategories.template.html',
  bindings: {
    items: '<'
  }
});

})();