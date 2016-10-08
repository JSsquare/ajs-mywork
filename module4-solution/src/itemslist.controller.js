(function () {
'use strict';

angular.module('menuApp')
.controller('ItemListController', ItemListController);

// 'item' is injected through state's resolve
ItemListController.$inject = ['item']
function ItemListController(item) {
  var itemDetail = this;
  itemDetail.itemsForCategory = item;  
}

})();