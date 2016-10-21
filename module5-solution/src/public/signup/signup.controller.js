(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController)
.service('callKitchenService', callKitchenService);

SignupController.$inject = ['callKitchenService'];

function SignupController(callKitchenService){	
	var signup = this;
	signup.userdetails = [];

	signup.submit = function (user) {		
	        var promise = callKitchenService.getCategories(user.favDish);	        
		    promise.then(function (response) {
		      signup.message = response.data.menu_items.length === 0 ? "No such menu number exists" : "Your information has been saved."
		      
		     signup.userdetails = response.data.menu_items.length === 0 ? (signup.userdetails.length = 0) : callKitchenService.pushUser(user, response.data.menu_items);
		    })
		    .catch(function (error) {
		      console.log(error);
		    })
	};

}


	callKitchenService.$inject = ['$http', 'ApiPath'];
	function callKitchenService($http, ApiPath){
		var kitchen = this;
		kitchen.userdetails = {};
		kitchen.userdetails.image = {};
		kitchen.userdetails.image.path = [];
		kitchen.userdetails.image.dishname = [];
		//kitchen.userdetails.dishname = [];
		kitchen.userdetails.signedup = false;

		kitchen.getCategories = function(shortName){
		    var response = $http({
		      method: "GET",
		      url: (ApiPath + '/menu_items.json'),
		      params: {
       			 category: shortName
      		  }
		    });
		   return response;			
		};


		kitchen.pushUser = function(user, menu_items){
		  kitchen.userdetails.signedup = true;		
		  kitchen.userdetails.image.length = 0;		  
		  kitchen.userdetails.firstname = user.firstname;
		  kitchen.userdetails.lastname = user.lastname;
		  kitchen.userdetails.phone = user.phone;		  
		  console.log(menu_items);
		  angular.forEach(menu_items, function (value, key) {
		  	kitchen.userdetails.image["description"]= value.description;
            kitchen.userdetails.image["path"] = ApiPath + "/images/" + value.short_name + ".jpg";
            kitchen.userdetails.image["dishname"]= value.name;
          });		  		  		
		  return kitchen.userdetails;
		};

		
		kitchen.getUser = function(){			
			return kitchen.userdetails;
		};		

		
	}


})();