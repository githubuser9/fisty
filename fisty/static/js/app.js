'use strict';

/* Config */

angular.module('ToursApp', [
    'ngRoute', 'djangular', 'ngSanitize', 'ngAnimate', 'chieffancypants.loadingBar',
    'ToursApp.filters', 'ToursApp.services', 'ToursApp.directives', 'ToursApp.controllers',
]).config([
    '$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/partials/main.html', controller: 'MainCtrl',
            pageTitle: 'Fisty.Ru | Горячие туры | Отдых и туризм | Туристический портал'
        });
        $routeProvider.when('/categories', {templateUrl: '/partials/categories-list.html', controller: 'CatListCtrl'});
        $routeProvider.when('/categories/:cat', {templateUrl: '/partials/categories-detail.html', controller: 'CatDetailCtrl'});
        $routeProvider.when('/about', {templateUrl: '/partials/about.html', controller: 'AboutCtrl'});
        $routeProvider.when('/feedback', {templateUrl: '/partials/feedback.html', controller: 'FeedbackCtrl'});
        $routeProvider.when('/tag/:tag', {templateUrl: '/partials/tags.html', controller: 'TagCtrl'});
        $routeProvider.when('/search/:search', {templateUrl: '/partials/search.html', controller: 'SearchCtrl'});
        $routeProvider.when('/:url', {templateUrl: '/partials/details.html', controller: 'DetailCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
    }
])
    .config(function ($httpProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    })
    .config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
    })
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;
    }]);


var search_text = $("#search_form");
search_text.keyup(function(){
    setTimeout(function() {
		if (search_text.val().length > 2) {
            window.location.href = "/#/search/" + search_text.val();
		}
    }, 1000);
});
