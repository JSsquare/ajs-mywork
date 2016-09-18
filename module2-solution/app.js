(function (){
	'use strict'

	angular.module('ShopkinsApp', [])
	.controller('ToBuyListController', ToBuyListController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('CheckOffService', CheckOffService);

	ToBuyListController.$inject = ['CheckOffService']
	AlreadyBoughtController.$inject = ['CheckOffService'];

	function ToBuyListController (CheckOffService){

		var toBuy = this;
		toBuy.items = [{
	   		name: "Cookie",
	   		quantity: 10
   		},
   		{
	   		name: "Bread",
	   		quantity: 4
   		},
   		{
	   		name: "Cake",
	   		quantity: 2
   		},
   		{
	   		name: "Fruits",
	   		quantity: 12
   		},
   		{
	   		name: "Green Tea",
	   		quantity: 3
   		}];

   		toBuy.addToAlreadyBought = function(itemName,itemQuantity){
   			
   			CheckOffService.addToAlreadyBought(itemName,itemQuantity);
   		} 

   		toBuy.removeFromToBuy = function(itemIndex){
   			toBuy.items.splice(itemIndex, 1);
   		}  		
	}

	function AlreadyBoughtController (CheckOffService){
		var alreadyBought = this;

		alreadyBought.items = CheckOffService.getAlreadyBoughtList();

	}



	function CheckOffService(){
		var service = this;
		var alreadyBoughtItems = [];

		service.addToAlreadyBought = function (itemName, itemQuantity){
			    var item = {
			      name: itemName,
			      quantity: itemQuantity
			    };	
			    alreadyBoughtItems.push(item);			    		    
		};

		service.getAlreadyBoughtList = function (){
			return alreadyBoughtItems;
		}
		
		service.removeFromToBuy = function(toBuyItems,itemName, itemQuantity){


		};
	}


  

})();