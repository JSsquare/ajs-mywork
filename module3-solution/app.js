(function (){
 	'use strict'
 	angular.module('NarrowItDownApp', [])
 	.controller('NarrowItDownController', NarrowItDownController)
 	.service('MenuSearchService', MenuSearchService)
 	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
 	.directive('foundItems', foundItemsDirective);

 	
 	function foundItemsDirective() {
 		var ddo = {
			templateUrl: 'foundItems.html',
   			 scope: {
		      found: '<',
		      onRemove: '&'
		    },		    
		    controller: NarrowItDownController,
		    controllerAs: 'narrowIt',
		    bindToController: true
	 	};
	 	return ddo;
 	}


 	NarrowItDownController.$inject = ['$http','MenuSearchService'];
	function NarrowItDownController($http, MenuSearchService){		
		var this_items = this;
		this_items.searchTerm  = "";
		
		$http.get("https://davids-restaurant.herokuapp.com/menu_items.json")
			.then( function(response) {
			  this_items.menu = response.data;
	  		  this_items.found = MenuSearchService.getMatchedMenuItems(this_items.menu, this_items.searchTerm);
	  		  console.log(this_items.found);
			});

		this_items.submit = function (){
			this_items.found = MenuSearchService.getMatchedMenuItems(this_items.menu, this_items.searchTerm);						  				
		};
		
		this_items.removeItem = function (itemIndex){
			console.log(this_items.found);
			this_items.found.splice(itemIndex, 1);
		};


		};
		


	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath){

		var service = this;
		service.found = [];

		service.getMatchedMenuItems = function(allItems, searchTerm){
			service.found.length = 0;			
			angular.forEach(allItems.menu_items, function(value,index){
				if (value.name.toLowerCase().indexOf(searchTerm.toLowerCase())!=-1 && searchTerm!="") {
     			 service.found.push(value);
    			}               
            });
            return service.found;
		};
	}

})();