(function () {
'use strict'

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope']

function LunchCheckController($scope){
	$scope.foodItems = "";	
	
	$scope.checkIfTooMuch = function () {
	 $scope.foodItems = $scope.foodItems.trim();
	 $scope.itemsArray = $scope.foodItems.split(',');
	 $scope.itemsCount = 0;

		for (var i = 0; i < $scope.itemsArray.length; i++) {
		    if ($scope.itemsArray[i]) {
		      $scope.itemsCount++;
		    }
		}	

		if( angular.equals($scope.itemsCount,0) ) 
			$scope.message = "Please enter data first";
		else if( $scope.itemsCount > 3 )
			$scope.message = "Too Much!!";
		else 
			$scope.message = "Enjoy!!";
	}

	};

})();