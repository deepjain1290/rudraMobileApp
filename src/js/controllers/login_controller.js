angular.module('DJMobileApp.controllers').controller('loginController', function ($scope, deviceReady) {

    console.log($scope);



    $scope.login = function (btn) {
        console.log(btn, $scope.entity)
        alert('login click')
    }

});

