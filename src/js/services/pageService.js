angular.module('DJMobileApp.services')

    .factory('pageService', function ($http, deviceReady, $rootScope) {
        return function (url, type, data, success, error) {
            deviceReady(function () {
                if (type == 'GET') {
                    $http.get(url)
                        .then(function (result) {
                            success(result)
                        }
                        , function (err) {
                            error(err)
                        });
                }
                else {
                    $http.post(url, data,
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(function (result) {
                            success(result)
                        }
                        , function (err) {
                            error(err)
                        });
                }
            });
        };
    });