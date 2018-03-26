var adds = {
    // global vars
    autoShowInterstitial: false,
    progressDialog: document.getElementById("progressDialog"),
    spinner: document.getElementById("spinner"),
    weinre: {
        enabled: false,
        ip: '', // ex. http://192.168.1.13
        port: '', // ex. 9090
        targetApp: '' // ex. see weinre docs
    },

    // Application Constructor
    initialize: function () {
        if ((/(ipad|iphone|ipod|android)/i.test(navigator.userAgent))) {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        } else {
            adds.onDeviceReady();
        }
    },
    // Must be called when deviceready is fired so AdMobAds plugin will be ready
    initAds: function () {
        var isAndroid = (/(android)/i.test(navigator.userAgent));
        var adPublisherIds = {
            ios: {
                banner: 'ca-app-pub-7014323267004971~8824050778',
                interstitial: 'ca-app-pub-7014323267004971/7893703369'
            },
            android: {
                banner: 'ca-app-pub-7014323267004971/1976976363',
                interstitial: 'ca-app-pub-7014323267004971/4663236496'
            }
        };
        var admobid;

        if (isAndroid) {
            admobid = adPublisherIds.android;
        } else {
            admobid = adPublisherIds.ios;
        }
        if (window.admob) {
            admob.setOptions({
                publisherId: admobid.banner,
                interstitialAdId: admobid.interstitial,
                bannerAtTop: true, // set to true, to put banner at top
                overlap: false, // set to true, to allow banner overlap webview
                offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
                isTesting: true, // receiving test ads (do not test with real ads as your account will be banned)
                autoShowBanner: true, // auto show banners ad when loaded
                autoShowInterstitial: false // auto show interstitials ad when loaded
            });
        } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
        }
    },
    // Bind Event Listeners
    bindAdEvents: function () {
        if (window.admob) {
            document.addEventListener("orientationchange", this.onOrientationChange, false);
            document.addEventListener(admob.events.onAdLoaded, this.onAdLoaded, false);
            document.addEventListener(admob.events.onAdFailedToLoad, this.onAdFailedToLoad, false);
            document.addEventListener(admob.events.onAdOpened, function (e) { }, false);
            document.addEventListener(admob.events.onAdClosed, function (e) { }, false);
            document.addEventListener(admob.events.onAdLeftApplication, function (e) { }, false);
            document.addEventListener(admob.events.onInAppPurchaseRequested, function (e) { }, false);
        } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
        }
    },

    // -----------------------------------
    // Events.
    // The scope of 'this' is the event.
    // -----------------------------------
    onOrientationChange: function () {
        adds.onResize();
    },
    onDeviceReady: function () {
        var weinre,
            weinreUrl;

        document.removeEventListener('deviceready', adds.onDeviceReady, false);

        if (adds.weinre.enabled) {
            console.log('Loading weinre...');
            weinre = document.createElement('script');
            weinreUrl = adds.weinre.ip + ":" + adds.weinre.port;
            weinreUrl += '/target/target-script-min.js';
            weinreUrl += '#' + adds.weinre.targetApp;
            weinre.setAttribute('src', weinreUrl);
            document.head.appendChild(weinre);
        }

        if (window.admob) {
            console.log('Binding ad events...');
            adds.bindAdEvents();
            console.log('Initializing ads...');
            adds.initAds();
        } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
        }
    },
    onAdLoaded: function (e) {
        adds.showProgress(false);
        if (window.admob && e.adType === window.admob.AD_TYPE.INTERSTITIAL) {
            if (adds.autoShowInterstitial) {
                window.admob.showInterstitialAd();
            } else {
                alert("Interstitial is available. Click on 'Show Interstitial' to show it.");
            }
        }
    },
    onAdFailedToLoad: function (e) {
        adds.showProgress(false);
        alert("Could not load ad: " + JSON.stringify(e));
    },
    onResize: function () {
        var msg = 'Web view size: ' + window.innerWidth + ' x ' + window.innerHeight;
        document.getElementById('sizeinfo').innerHTML = msg;
    },

    // -----------------------------------
    // App buttons functionality
    // -----------------------------------
    startBannerAds: function () {
        if (window.admob) {
            adds.showProgress(true);
            window.admob.createBannerView(function () { }, function (e) {
                alert(JSON.stringify(e));
            });
        } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
        }
    },
    removeBannerAds: function () {
        if (window.admob) {
            adds.showProgress(false);
            window.admob.destroyBannerView();
        } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
        }
    },
    showBannerAds: function () {
        if (window.admob) {
            adds.showProgress(false);
            window.admob.showBannerAd(true, function () { }, function (e) {
                alert(JSON.stringify(e));
            });
        } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
        }
    },
    hideBannerAds: function () {
        if (window.admob) {
            adds.showProgress(false);
            window.admob.showBannerAd(false);
        } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
        }
    },
    requestInterstitial: function (autoshow) {
        if (window.admob) {
            adds.showProgress(true);
            adds.autoShowInterstitial = autoshow;
            window.admob.requestInterstitialAd(function () { }, function (e) {
                alert(JSON.stringify(e));
            });
        } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
        }
    },
    showInterstitial: function () {
        if (window.admob) {
            adds.showProgress(false);
            window.admob.showInterstitialAd(function () { }, function (e) {
                alert(JSON.stringify(e));
            });
        } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
        }
    },
    showProgress: function (show) {
        if (show) {
            addClass(adds.spinner, "animated");
            removeClass(adds.progressDialog, "hidden");
        } else {
            addClass(adds.progressDialog, "hidden");
            removeClass(adds.spinner, "animated");
        }
    }
};
function removeClass(elem, cls) {
    var str;
    do {
        str = " " + elem.className + " ";
        elem.className = str.replace(" " + cls + " ", " ").replace(/^\s+|\s+$/g, "");
    } while (str.match(cls));
}

function addClass(elem, cls) {
    elem.className += (" " + cls);
}
