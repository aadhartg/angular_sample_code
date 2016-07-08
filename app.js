/* Configure modules*/
var frontAppSpto = angular.module('MyApp', ['ngResource',
                                            'ui.router',
                                            'ngRoute',
                                            'ngMessages',
                                            'toaster',
                                            'ngStorage',
                                            'angular-storage',
                                            'base64',
                                            'ngSanitize',
                                            'angular-jwt',
                                            'oc.lazyLoad',                                         
                                            'ui.bootstrap',
                                            'angular-loading-bar',
                                            'angularMoment',
                                            'textAngular',
                                            'ngTagsInput',
                                            'ng-sweet-alert',                                            
                                            ]);

/* Configure ocLazyLoader*/
frontAppSpto.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            cssFilesInsertBefore: 'ng_load_plugins_before' // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        });
    }]);
frontAppSpto.config(['$controllerProvider', function ($controllerProvider) {
        $controllerProvider.allowGlobals();
    }]);


frontAppSpto.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'Config', 'jwtInterceptorProvider', '$httpProvider', 
  function ($stateProvider, $urlRouterProvider, $locationProvider, Config, jwtInterceptorProvider, $httpProvider) {
        // start state area 
        $stateProvider
                .state('signup', {               
                    url: '/signup',   
                    requiresLogin: false,            
                    templateUrl:  Config.httpBasePath +'partials/signup.html',
                    controller: 'SignupCtrl',
                   
                });
                 
    
        // End state area 
        jwtInterceptorProvider.tokenGetter = function (store) {
            return store.get('token');
        };
        $httpProvider.interceptors.push('jwtInterceptor')
        $httpProvider.interceptors.push('authHttpResponseInterceptor');
        // Redirect any unmatched url
        $urlRouterProvider.otherwise("/");
    }])
    .config(['$resourceProvider', function ($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }]).run(function ($state, $localStorage,  store, $location, $rootScope, jwtHelper) {
        $rootScope.$on('$stateChangeStart', function (e, to) {
            var token = store.get('token');
            var role = store.get('role');
            if (to.requiresLogin) {
                if (!token || jwtHelper.isTokenExpired(token) || role != 2) {
                    e.preventDefault();
                    $localStorage.id='';
                    $localStorage.name='';
                    store.remove('token');
                    store.remove('role');
                    store.remove('user');
                    
                }
            }
        
    });
    $rootScope.$on("$stateChangeError", function (event, current, previous, eventObj) {
       if (eventObj.authenticated === false) {
            $location.path("/login");
        }
    });
    });

        
