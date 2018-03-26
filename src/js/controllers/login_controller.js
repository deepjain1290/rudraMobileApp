angular.module('DJMobileApp.controllers').controller('loginController', function ($scope, deviceReady) {

    console.log($scope);
    adds.initialize();
    adds.startBannerAds();


    $scope.login = function (btn) {
        console.log(btn, $scope.entity)
        alert('login click')
    }

});

