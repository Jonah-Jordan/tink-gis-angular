'use strict';
(function (module) {
    module = angular.module('tink.gis.angular');
    module.directive('tinkLayers', function () {
        return {
            // restrict: 'E',
            replace: true,
            templateUrl: 'templates/layersTemplate.html',
            controller: 'layersController'
        };
    });
})();