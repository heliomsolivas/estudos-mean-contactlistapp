function AppController($scope, $http){
	console.log("Hello World from Controller");

var refresh = function(){


//Rota de onde vamos pegar os dados
	$http.get('/contactList').success(function(response){
		console.log('I got the data from server');
		$scope.contactList = response;
		$scope.contact = '';
	});
};

refresh();

$scope.addContact = function(){
	console.log($scope.contact);
	$http.post('/contactList', $scope.contact).success(function(response){
		console.log(response);
		refresh();
	});
};

$scope.remove = function(id){
	//Ve o ID LOCAL
	console.log(id);
	$http.delete('/contactList/'+id).success(function(response){
		refresh();
	}); 

};

$scope.edit = function(id){
	//Ve o ID LOCAL
	console.log(id);
	$http.get('/contactList/'+id).success(function(response){
		$scope.contact = response;
	}); 

};

$scope.update = function(id){
	//Ve o ID LOCAL
	console.log($scope.contact._id);
	$http.put('/contactList/'+$scope.contact._id, $scope.contact).success(function(response){
		refresh();
	}); 

};

$scope.deselect = function(){
	$scope.contact = "";
}
	

}