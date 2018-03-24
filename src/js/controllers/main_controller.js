angular.module('DJMobileApp.controllers.Main', [
    'DJMobileApp.services'
])

    .controller('MainController', function ($scope, deviceready, getCurrentPosition, getWeather) {

        deviceReady(function () {
            // Set AdMobAds options:
            admob.setOptions({
                publisherId: "ca-app-pub-7014323267004971/1976976363"  // Required
            });

            admob.createBannerView();

            admob.showBannerAd(true);
        });

        $scope.isAuth = false;
        console.log($scope);


        $scope.openRegister = function (btn) {
            $scope.isRegister = true;
            $scope.regEntity = {};
        }
        $scope.closeRegister = function () {
            $scope.isRegister = false;
            $scope.regEntity = {};
        }
        $scope.registerUser = function () {
            console.log($scope.regEntity)
            //VALIDATE

            if ($scope.regEntity) {
                if ($scope.regEntity.userName) {
                    if ($scope.regEntity.userName == '') {
                        showMsg('Please enter valid user name.')
                        return;
                    }
                }
                else {
                    showMsg('Please enter valid user name.')
                    return;
                }

                if ($scope.regEntity.password) {
                    if ($scope.regEntity.password == '') {
                        showMsg('Please enter valid Password.')
                        return;
                    }
                }
                else {
                    showMsg('Please enter valid Password.')
                    return;
                }

                if ($scope.regEntity.customerId) {
                    if ($scope.regEntity.customerId == '') {
                        showMsg('Please enter Customer Id.')
                        return;
                    }
                }
                else {
                    showMsg('Please enter valid Customer Id.')
                    return;
                }

                if ($scope.regEntity.mobileNo) {
                    if ($scope.regEntity.mobileNo == '') {
                        showMsg('Please enter Mobile No.')
                        return;
                    }
                    else {

                    }
                }
                else {
                    showMsg('Please enter valid Mobile No.')
                    return;
                }
            }
            else {
                showMsg('Please enter valid user detail.')
                return;
            }

            //send request to server.
            $scope.isVerifyPin = true;
        }

        $scope.backToRegister = function () {
            $scope.isVerifyPin = false;
        }
        $scope.verifyOTP = function () {
            showMsg('OTP Verified!!!')
            $scope.isAuth = true;
            $scope.isRegister = false;
            $scope.isVerifyPin = false;
        }
        function showMsg(msg) {
            alert(msg)
        }

        $scope.login = function (btn) {
            console.log(btn, $scope.entity)
        }


        getCurrentPosition(function (position) {
            getWeather(
                position.coords.latitude,
                position.coords.longitude,
                function (location, weather) {
                    $scope.location = location;
                    $scope.weather = weather;
                    console.log($scope.location, $scope.weather)
                });
        });

        // var map;
        // document.addEventListener("deviceready", function () {
        //     var div = document.getElementById("map_canvas");

        //     // Initialize the map view
        //     map = Map.getMap(div);

        //     // Wait until the map is ready status.
        //     map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
        // }, false);

        // function onMapReady() {
        //     var button = document.getElementById("mapbtn");
        //     button.addEventListener("click", onButtonClick);
        // }

        // function onButtonClick() {

        //     // Move to the position with animation
        //     map.animateCamera({
        //         target: { lat: 37.422359, lng: -122.084344 },
        //         zoom: 17,
        //         tilt: 60,
        //         bearing: 140,
        //         duration: 5000
        //     }, function () {

        //         // Add a maker
        //         map.addMarker({
        //             position: { lat: 37.422359, lng: -122.084344 },
        //             title: "Welecome to \n" +
        //                 "Cordova GoogleMaps plugin for iOS and Android",
        //             snippet: "This plugin is awesome!",
        //             animation: plugin.google.maps.Animation.BOUNCE
        //         }, function (marker) {

        //             // Show the info window
        //             marker.showInfoWindow();

        //             // Catch the click event
        //             marker.on(plugin.google.maps.event.INFO_CLICK, function () {

        //                 // To do something...
        //                 alert("Hello world!");

        //             });
        //         });
        //     });
        // }

        // querySelector, jQuery style
        // var $ = function (selector) {
        //     return document.querySelector(selector);
        // };

        // angular.element()
        // var btnRipple = $(".ripple-effect");
        // console.log(btnRipple)
        // btnRipple.onclick = rippleClick;

        // function rippleClick(e) {
        //     console.log(e)

        //     //         // create .ink element if it doesn't exist
        //     //         if (rippler.find(".ink").length == 0) {
        //     //             rippler.append("<span class='ink'></span>");
        //     //         }
        // }

        // // Ripple-effect animation
        // (function ($) {
        //     $(".ripple-effect").click(function (e) {
        //         var rippler = $(this);

        //         // create .ink element if it doesn't exist
        //         if (rippler.find(".ink").length == 0) {
        //             rippler.append("<span class='ink'></span>");
        //         }

        //         var ink = rippler.find(".ink");

        //         // prevent quick double clicks
        //         ink.removeClass("animate");

        //         // set .ink diametr
        //         if (!ink.height() && !ink.width()) {
        //             var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
        //             ink.css({ height: d, width: d });
        //         }

        //         // get click coordinates
        //         var x = e.pageX - rippler.offset().left - ink.width() / 2;
        //         var y = e.pageY - rippler.offset().top - ink.height() / 2;

        //         // set .ink position and add class .animate
        //         ink.css({
        //             top: y + 'px',
        //             left: x + 'px'
        //         }).addClass("animate");
        //     })
        // })(jQuery);
    });