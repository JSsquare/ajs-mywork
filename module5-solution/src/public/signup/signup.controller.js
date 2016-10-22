(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController)
.service('callKitchenService', callKitchenService);

SignupController.$inject = ['callKitchenService', 'MenuService'];

function SignupController(callKitchenService, MenuService){	
	var signup = this;
	signup.userdetails = [];

	signup.submit = function (user) {					
	        var promise = callKitchenService.getDishDetails(user.favDish);	        
		    promise.then(function (response) {

		    	signup.message = "Your information has been saved.";
		    	signup.userdetails = callKitchenService.saveUser(user, response.data);
		      //signup.message = response.data.menu_items.length === 0 ? "No such menu number exists" : "Your information has been saved."
		      
		     //signup.userdetails = response.data.menu_items.length === 0 ? (signup.userdetails.length = 0) : callKitchenService.pushUser(user, response.data.menu_items);
		    })
		    .catch(function (error) {
		     	signup.message = "No such menu number exist";		    
		    })
	};

}


	callKitchenService.$inject = ['$http', 'ApiPath'];
	function callKitchenService($http, ApiPath){
		var kitchen = this;
		kitchen.userdetails = {};		
		//kitchen.userdetails.dishname = [];
		kitchen.userdetails.signedup = false;

		kitchen.getDishDetails = function(shortName){
		    var response = $http({
		      method: "GET",
		      url: (ApiPath + '/menu_items/' + shortName + '.json')
		    });
		   return response;			
		};


		kitchen.saveUser = function(user, menu_item){
		  kitchen.userdetails.length = 0;

		  kitchen.userdetails.signedup = true;
		  kitchen.userdetails.firstname = user.firstname;
		  kitchen.userdetails.lastname = user.lastname;
		  kitchen.userdetails.phone = user.phone;		  		  
		  kitchen.userdetails.image = ApiPath + "/images/" + user.favDish + ".jpg";
		  kitchen.userdetails.description = menu_item.description;
		  kitchen.userdetails.dishname = menu_item.name;

		  console.log(kitchen.userdetails);		  
		  return kitchen.userdetails;
		};

		
		kitchen.getUser = function(){			
			return kitchen.userdetails;
		};		

		
	}


})();