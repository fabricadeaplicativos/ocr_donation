// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: '',
		controller: 'HomeController',
		templateUrl: 'templates/home.html'
	})
	.state('submit', {
		controller : 'submitController',
		templateUrl: 'templates/submit.html'
	})
})

.controller('HomeController',['$scope', '$stateParams', '$http', 'CordovaCamera' ,function($scope, $stateParams, $http, CordovaCamera) {
	$scope.getPhoto = function() {
		var imageInfo = {
						quality: 75,
						destinationType : Camera.DestinationType.DATA_URL,
						sourceType : Camera.PictureSourceType.CAMERA, 
						encodingType: Camera.EncodingType.JPEG,
						allowEdit : true,
		 				targetWidth: 320,
						targetHeight: 320,
						saveToPhotoAlbum: false};
		CordovaCamera.getPicture(imageInfo).then(function(imageURI) {
			$scope.imageURI;
			$scope.lastPhoto = "data:image/jpeg;base64," + imageURI;
			$scope.msg = "Success!";
			$http({
				url : 'http://54.174.41.185/ocr/index.php',
				method:'post',	
				data : JSON.stringify({'teste': "aa"}),
			});
		}, function(err) {
			console.err(err);
			$scope.msg = "Fail!";
		});
	};
}])

.controller('submitController', function($scope, $http) {
	var success = function() {
		console.log("Imagem enviada com sucesso!");
	};
	var  fail = function(error) {
		alert("Infelizmente não foi possível enviar a nota, tente novamente mais tarde.");
		console.log("Error code = " + error.code);
	};

	$scope.submitFile = function( $scope, $http) {
		console.log("sgaugsafhoaufgpiaufiushdfjh")
		var parameter = {
			image : $scope.lastPhoto
		};
		var options = new FileUploadOptions();
		options.parameter = parameter;
		var fileTransfer = new FileTransfer();
		fileTransfer.upload($scope.imageURI, encodeURI("http://54.174.227.90/ocr/"), success, fail, options );
	};
})

.factory('CordovaCamera', ['$q', function($q) {
	return {
		getPicture: function(options) {
			var q = $q.defer();
			navigator.camera.getPicture(function(result) {
				// Do any magic you need
				q.resolve(result);
			}, function(err) {
				q.reject(err);
			}, options);
			return q.promise;
		}
	}

}]);