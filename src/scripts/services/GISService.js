//http://app10.p.gis.local/arcgissql/rest/services/COMLOC_CRAB_NAVTEQ/GeocodeServer/reverseGeocode
//http://proj4js.org/
'use strict';
(function() {
    var module = angular.module('tink.gis');
    var service = function($http, map, MapData, HelperService, $rootScope) {
        var _service = {};
        _service.ReverseGeocode = function (event) {
            var lambert72Cords = HelperService.ConvertWSG84ToLambert72(event.latlng);
            var loc = lambert72Cords.x + "," + lambert72Cords.y;
            var urlloc = encodeURIComponent(loc);
            MapData.CleanWatIsHier();
            var prom = $http.get('http://app10.p.gis.local/arcgissql/rest/services/COMLOC_CRAB_NAVTEQ/GeocodeServer/reverseGeocode?location=' + urlloc + '&distance=50&outSR=&f=json');
            return prom;
        };
        _service.GetThemeData = function(url) {
            var prom = $http.get(url);
            return prom;
        };
        _service.GetThemeLayerData = function(mapServiceUrl) {
            var prom = $http.get(mapServiceUrl + 'layers?f=pjson');
            return prom;
        };
        return _service;
    };
    module.$inject = ["$http", 'map', 'MapData', 'HelperService', '$rootScope'];
    module.factory("GISService", service);
})();