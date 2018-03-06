'use strict';
angular.module('DJMobileApp.services').factory('DJWebStore',
    ['$location', '$rootScope', function ($location, $rootScope) {

        var SERVICE_BASE_URL = '';

        var host = $location.host();
        var port = $location.$$port;


        var _serviceBaseURL = null;
        //added by dj@03.03.2017
        if (host.toLowerCase() == 'localhost' && port == '3000') {
            _serviceBaseURL = window.localStorage.getItem('devAPIUrl');
            console.log('debug mode', _serviceBaseURL)
            if (_serviceBaseURL == null) {
                console.log('loading api from web sotre file.')
                _serviceBaseURL = SERVICE_BASE_URL;
            }
            //NO NEED TO COMMENT FOR PUBLISH
        }



        var djWebStoreFactory = {};


        function _set(key, value) {
            window.localStorage.setItem(key, value);
        }
        function _get(key) {
            return window.localStorage.getItem(key)
        }
        function _isDev() {
            if (host.toLowerCase() == 'localhost' && port == '3000') {
                return true;
            }
            return false;
        }
        function _getUserProfile() {

            var profileData = _get('profileDataKey');
            if (profileData.profilePhoto != "data:image/jpeg;base64,")
                $rootScope.profilePicture = profileData.profilePhoto;
            return profileData;
        }
        function _setUserProfile(profileData) {
            if (profileData.profilePhoto != "data:image/jpeg;base64,")
                $rootScope.profilePicture = profileData.profilePhoto;

            return _set('profileDataKey', profileData);
        }
        function _getSysParam() {
            var sysParam = _get('sysParamKey');
            return sysParam;
        }
        function _setSysParam(data) {

            return _set('sysParamKey', data);
        }
        function _getCompany() {
            var company = _get('companyKey');
            $rootScope.company = { name: company.name }
            return company;
        }
        function _setCompany(company) {
            $rootScope.company = { name: company.name }
            return _set('companyKey', company);
        }
        function _getAuthorization() {
            return _get('authorizationDataKey');
        }
        function _setResource(resourceData) {
            return _set('resourceKey', resource);
        }
        function _getResource() {
            return _get('resourceKey');
        }
        function _setAuthorization(authData) {
            _set('authorizationDataKey', authData)
        }
        function _setUser(userData) {

        }
        function _validateUser() {
            var urlPath = $location.absUrl();
            var authData = _getAuthorization();
            if (authData == null) {
                //if (urlPath.indexOf('auth.html') < 0)
                {
                    _logout();
                }
                return;
            }

            var expiresLocal = moment(moment.utc(authData.expires).toDate());
            // console.log(moment())
            var localTime = moment()
            var timeSpan = expiresLocal.diff(localTime, 'minute')
            // var timeSpan2 = expires.diff(moment(authData.issued))

            if (timeSpan < 0) {
                //token expired 
                //if (urlPath.indexOf('auth.html') < 0) 
                {
                    _logout();
                }
                return;
            }

            var profileData = _getUserProfile();
            var appData = _getAppData();
            var sysParam = _getSysParam();
            var company = _getCompany();
            var resource = _getResource();
            var data = {
                app: appData,
                profile: profileData,
                auth: authData,
                sysparam: sysParam,
                comapny: company,
                rp: resource
            }

            $rootScope.user = data;

            return data;
        }

        function _removeAllKeys() {

            var devApi = _get('devAPIUrl');

            window.localStorage.clear();

            _set('devAPIUrl', devApi)
        }
        function _logout() {
            console.log('Logout from system');
            _removeAllKeys();
            //window.location.href = 'auth.html';
        }

        //To check running mode is in development 
        djWebStoreFactory.IsDev = _isDev;
        //Validate Logged In User
        djWebStoreFactory.ValidateUser = _validateUser;
        //Set Data for Logged In User
        djWebStoreFactory.SetUser = _setUser;
        //Clear Keys and Redirect User to Login Page
        djWebStoreFactory.Logout = _logout;

        return djWebStoreFactory;

    }]);

