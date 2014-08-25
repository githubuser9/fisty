'use strict';

/* Directives */


angular.module('ToursApp.directives', [])
.directive("get", function () {
    return {
        restrict: "A",
        scope: {
            text: '@postId'
        }
    };
    });