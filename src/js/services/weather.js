angular.module('DJMobileApp.services')

    .factory('getWeather', function (pageService) {
        return function (lat, lng, done) {

            var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=eeece92aea76edbc7bba478e6cfac13b&units=metric';
            pageService(url,
                'GET',
                undefined,
                _success, 
                _error
            )
            function _success(response) {
                console.log(response)
                done(response.data.name, response.data.main.temp);
            }
            function _error(err) {
                throw new Error('Unable to get weather');
            }
            // $http({
            //     method: 'GET',
            //     url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=eeece92aea76edbc7bba478e6cfac13b&units=metric'
            // })

            //     .then(function (response) {
            //         console.log(response);
            //         done(response.data.name, response.data.main.temp);
            //     }
            //     , function (error) {
            //         throw new Error('Unable to get weather');
            //     });
        };
    });