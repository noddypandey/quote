var app=angular.module('quotesApp',[]);

app.controller('UsersController',function($scope,$http){
	$scope.users=[];
	$scope.init=function(){
		$http.get("/users").then(function(response){
			$scope.users=response.data;
		});
	}
});