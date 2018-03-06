/**
 * @author deepak.jain
 * created on 17/04/2017
 */
(function () {
  'use strict';

  angular.module('DJMobileApp.common', []).run(function ($rootScope, $filter, DJWebStore,
    pageService, $timeout, $location) {
    //Validating user
    $rootScope.user = DJWebStore.ValidateUser();

    $rootScope.isAuth = true;

    console.log($rootScope);

    // $rootScope.currentPeriod = new Date(moment().year(), moment().month(), moment().date());

    if ($rootScope.user != undefined) {
      $rootScope.isAuth = true;
      if ($rootScope.user.profile.profilePhoto == 'data:image/jpeg;base64,') {
        $rootScope.profilePicture = 'data:image/png;base64,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';
      }
      else {
        $rootScope.profilePicture = $rootScope.user.profile.profilePhoto;
      }
    }
    else {
      $rootScope.isAuth = true;
    }
    console.log($rootScope.user)


  

  });
})();
