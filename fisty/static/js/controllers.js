'use strict';

/* Controllers */

angular.module('ToursApp.controllers', [])

    .controller('TitleController', function ($scope, $route) {
        $scope.$on('$routeChangeSuccess', function () {
            $scope.pageTitle = $route.current.pageTitle;
        });
    })

    .controller('MainCtrl', ['$scope', '$http', '$templateCache', '$timeout', 'cfpLoadingBar', '$anchorScroll', '$sce',
        function ($scope, $http, $templateCache, $timeout, cfpLoadingBar, $anchorScroll) {

            $scope.main = {
                page: 1,
                pages: 2
            };

            loadingBar($scope, $timeout, cfpLoadingBar);

            $scope.loadPage = function () {

                $scope.method = 'GET';
                $scope.url = '/api/articles/?page_size=5&page=' + $scope.main.page + '&format=json';

                $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
                    success(function (data, status) {
                        $scope.status = status;
                        $scope.data = data['results'];
                        $scope.next = data['next'];
                        $scope.previous = data['previous'];
                        $scope.main.pages = Math.ceil(data['count'] / 5);
                        $anchorScroll();
                    }).
                    error(function (data, status) {
                        $scope.data = data || "Request failed";
                        $scope.status = status;
                    });
            };

            $scope.nextPage = function () {
                    $scope.main.page++;
                    $scope.loadPage();

            };

            $scope.previousPage = function () {
                if ($scope.main.page > 1) {
                    $scope.main.page--;
                    $scope.loadPage();
                }
            };

            $scope.loadPage();

        }])

    .controller('DetailCtrl', ['$scope', '$http', '$templateCache', '$routeParams', '$timeout', 'cfpLoadingBar', '$anchorScroll', '$sce',
        function ($scope, $http, $templateCache, $routeParams, $timeout, cfpLoadingBar, $anchorScroll) {

            loadingBar($scope, $timeout, cfpLoadingBar);

            $scope.method = 'GET';

            var pk = String($routeParams.url).split('-').slice(-1);

            if (isInt(pk)) {
                $scope.url = '/api/articles/?id=' + pk + '&format=json';
            } else {
                $scope.url = '/api/articles/?slug=' + $routeParams.url + '&format=json';
            }

            $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
                success(function (data, status) {
                    $scope.status = status;
                    $scope.data = data[0];
                    $('title').text('Fisty.Ru | ' + data[0].title);
                    $anchorScroll();
                }).
                error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
        }])

    .controller('TagCtrl', ['$scope', '$http', '$templateCache', '$routeParams', '$timeout', 'cfpLoadingBar', '$anchorScroll', '$sce',
        function ($scope, $http, $templateCache, $routeParams, $timeout, cfpLoadingBar, $anchorScroll) {

            loadingBar($scope, $timeout, cfpLoadingBar);

            $scope.method = 'GET';

            $scope.url = '/api/tags/?name=' + $routeParams.tag + '&format=json';

            $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
                success(function (data, status) {
                    $scope.status = status;
                    $scope.data = data;
                    $('title').text('Fisty.Ru | ' + String($routeParams.tag)).html();
                    $anchorScroll();
                }).
                error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
        }])

    .controller('SearchCtrl', ['$scope', '$http', '$templateCache', '$routeParams', '$timeout', 'cfpLoadingBar', '$anchorScroll', '$sce',
        function ($scope, $http, $templateCache, $routeParams, $timeout, cfpLoadingBar, $anchorScroll) {

            loadingBar($scope, $timeout, cfpLoadingBar);

            $scope.method = 'GET';

            $scope.url = '/search/?q=' + $routeParams.search + '&models=tours.article';

            $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
                success(function (data, status) {
                    $scope.status = status;
                    $scope.data = data;
                    $('title').text('Fisty.Ru | ' + String($routeParams.search)).html();
                    $anchorScroll();
                }).
                error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
        }])


    .controller('CatListCtrl', ['$scope', '$http', '$templateCache', '$routeParams', '$timeout', 'cfpLoadingBar', '$anchorScroll', '$sce',
        function ($scope, $http, $templateCache, $routeParams, $timeout, cfpLoadingBar, $anchorScroll) {

            loadingBar($scope, $timeout, cfpLoadingBar);

            $scope.method = 'GET';

            $scope.url = '/api/categories/?format=json';

            $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
                success(function (data, status) {
                    $scope.status = status;
                    $scope.data = data;
                    $('title').text('Fisty.Ru | Категории').html();
                    $anchorScroll();
                }).
                error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
        }])

    .controller('CatDetailCtrl', ['$scope', '$http', '$templateCache', '$routeParams', '$timeout', 'cfpLoadingBar', '$anchorScroll', '$sce',
        function ($scope, $http, $templateCache, $routeParams, $timeout, cfpLoadingBar, $anchorScroll) {

            loadingBar($scope, $timeout, cfpLoadingBar);

            $scope.method = 'GET';

            $scope.url = '/api/categories/?title=' +  $routeParams.cat + '&format=json';

            $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
                success(function (data, status) {
                    $scope.status = status;
                    $scope.data = data;
                    $('title').text('Fisty.Ru | ' + String($routeParams.cat)).html();
                    $anchorScroll();
                }).
                error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
        }])

    .controller('AboutCtrl', ['$scope', '$http', '$templateCache', '$routeParams', '$timeout', 'cfpLoadingBar', '$anchorScroll', '$sce',
        function ($scope, $http, $templateCache, $routeParams, $timeout, cfpLoadingBar, $anchorScroll) {

        }])

    .controller('FeedbackCtrl', ['$scope', '$http', '$templateCache', '$routeParams', '$timeout', 'cfpLoadingBar', '$anchorScroll', '$sce',
        function ($scope, $http, $templateCache, $routeParams, $timeout, cfpLoadingBar, $anchorScroll) {

        }])

    .run(["$rootScope", function ($rootScope) {

    }]);


function loadingBar($scope, $timeout, cfpLoadingBar) {
    $scope.start = function () {
        cfpLoadingBar.start();
    };

    $scope.complete = function () {
        cfpLoadingBar.complete();
    };

    $scope.start();
    $scope.fakeIntro = true;
    $timeout(function () {
        $scope.complete();
        $scope.fakeIntro = false;
    }, 500);
}


function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}
