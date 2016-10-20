'use strict';

(function (module) {
    var module;
    try {
        module = angular.module('tink.gis');
    } catch (e) {
        module = angular.module('tink.gis', ['tink.accordion', 'tink.tinkApi', 'ui.sortable', 'tink.modal', 'angular.filter']); //'leaflet-directive'
    }
    module.controller('layersManagementController', ['$scope', 'MapData', 'ThemeService', 'LayerManagementService', function ($scope, MapData, ThemeService, LayerManagementService) {
        $scope.pagingCount = null;
        $scope.numberofrecordsmatched = 0;
        $scope.availableThemes = MapData.Themes;
        $scope.allThemes = [];
        var init = function () {
            $scope.searchTerm = '';
        }();
        $scope.searchChanged = function () {};

        $scope.pageChanged = function (page, recordsAPage) {
            var startItem = (page - 1) * recordsAPage;
            $scope.availableThemes = $scope.allThemes.slice(startItem, startItem + recordsAPage);
            // console.log(page, recordsAPage);
            // $scope.QueryGISSOLR($scope.searchTerm, page);
        };
        $scope.selectedTheme = null;
        $scope.copySelectedTheme = null;
        $scope.previewTheme = function (theme) {
            console.log('themeChanged');
            console.log(theme);
            var alreadyExistingTheme = MapData.Themes.find(function (x) {
                return x.CleanUrl === theme.CleanUrl;
            });
            if (alreadyExistingTheme) {
                theme = alreadyExistingTheme;
            }
            $scope.selectedTheme = theme;
            $scope.copySelectedTheme = angular.copy(theme);
        };
        $scope.clearPreview = function () {
            $scope.selectedTheme = null;
            $scope.copySelectedTheme = null;
        };
        $scope.ThemeChanged = function (theme) {
            $scope.previewTheme(theme);
        };

        $scope.AddOrUpdateTheme = function () {
            LayerManagementService.AddOrUpdateTheme($scope.selectedTheme, $scope.copySelectedTheme);
            $scope.clearPreview();
        };
    }]);
})();