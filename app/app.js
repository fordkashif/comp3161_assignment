var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/logout.html',
                controller: 'logoutCtrl'
        })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl'
        })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'authCtrl'
        })
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
                role: '0'
        })
        .otherwise({
            redirectTo: '/login'
        });
        
    }])
        .run(function ($rootScope, $location, Data) {
            $rootScope.$on("$routeChangeStart", function(event, next, current) {
                $rootScope.authenticated = false;
                Data.get('session').then(function (results) {
                    if (results.profile_ID) {
                        $rootScope.authenticated = true;
                        $rootScope.profile_ID = results.profile_ID;
                        $rootScope.first_name = results.first_name;
                        $rootScope.last_name = results.last_name;
                        $rootScope.email = results.email;
                    } else {
                        var nextUrl = next.$$route.originalPath;
                        if (nextUrl == '/signup' || nextUrl == '/login') {
                            
                        } else {
                            $location.path("/login");
                        }
                    }
                });
            });
});