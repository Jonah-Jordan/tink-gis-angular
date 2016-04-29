'use strict';
(function () {
    var module;
    try {
        module = angular.module('tink.gis');
    } catch (e) {
        module = angular.module('tink.gis', ['tink.accordion', 'tink.tinkApi', 'tink.modal']); //'leaflet-directive'
    }
    var dataService = function (MapData, map, GISService, ThemeHelper, WMSService, ThemeService, $q) {
        var _dataService = {};
        _dataService.Export = function () {
            var exportObject = {};
            var arr = MapData.Themes.map(theme => {
                let returnitem = {};
                returnitem.Naam = theme.Naam;
                returnitem.CleanUrl = theme.CleanUrl;
                returnitem.Type = theme.Type;
                returnitem.Visible = theme.Visible;
                returnitem.Layers = theme.AllLayers.filter(x => { return x.enabled == true; }).map(layer => {
                    var returnlayer = {};
                    // returnlayer.enabled = layer.enabled; // will always be true... since we only export the enabled layers
                    returnlayer.visible = layer.visible;
                    returnlayer.name = layer.name;
                    returnlayer.id = layer.id;
                    return returnlayer;
                });
                return returnitem;
            });
            exportObject.Themes = arr;
            exportObject.Extent = map.getBounds();
            exportObject.IsKaart = true;

            return exportObject;
        };
        _dataService.Import = function (project) {
            console.log(project);
            _dataService.setExtent(project.extent);
            let themesArray = [];
            let promises = [];

            project.themes.forEach(theme => {
                if (theme.type == ThemeType.ESRI) {
                    let prom = GISService.GetThemeData(theme.cleanUrl + '?f=pjson');
                    promises.push(prom);
                    prom.success(function (data, statuscode, functie, getdata) {
                        themesArray.push(ThemeHelper.createThemeFromJson(data, getdata));
                    });
                } else {
                    // wms
                    let prom = WMSService.GetCapabilities(theme.cleanUrl);
                    promises.push(prom);
                    prom.success(function (data, status, headers, config) {
                        themesArray.push(data);
                    }).error(function (data, status, headers, config) {
                        console.log('error!!!!!!!', data, status, headers, config);

                    });
                }

            });
            $q.all(promises).then(function () {
                var orderedArray = [];
                var errorMessages = [];
                project.themes.forEach(theme => {
                    var realTheme = themesArray.find(x => x.CleanUrl == theme.cleanUrl);
                    realTheme.Visible = theme.visible;
                    console.log(theme, ' vs real theme: ', realTheme);
                    if (realTheme.AllLayers.length == theme.layers.length) {
                        realTheme.Added = true; //all are added 
                    }
                    else {
                        realTheme.Added = null; // some are added, never false because else we woudn't save it.
                    }
                    realTheme.AllLayers.forEach(layer => {
                        layer.enabled = false;  // lets disable all layers first
                    });
                    //lets check what we need to enable and set visiblity of, and also check what we don't find
                    theme.layers.forEach(layer => {
                        var realLayer = realTheme.AllLayers.find(x => x.name == layer.name);
                        if (realLayer) {
                            realLayer.visible = layer.visible; // aha so there was a layer, lets save this
                            realLayer.enabled = true;
                        }
                        else {
                            errorMessages.push('"' + layer.name + '" not found in mapserver: ' + realTheme.Naam + '.');
                        }
                    });
                });
                project.themes.forEach(theme => { // lets order them, since we get themesArray filled by async calls, the order can be wrong, thats why we make an ordered array
                    var realTheme = themesArray.find(x => x.CleanUrl == theme.cleanUrl);
                    orderedArray.unshift(realTheme);
                });
                ThemeService.AddAndUpdateThemes(orderedArray);
                console.log('all loaded');
                if (errorMessages.length > 0) {
                    alert(errorMessages.join('\n'));
                }
            });

        };
        _dataService.setExtent = function (extent) {

            map.fitBounds([[extent._northEast.lat, extent._northEast.lng], [extent._southWest.lat, extent._southWest.lng]]);
        };


        return _dataService;
    };
    module.$inject = ['MapData', 'map', 'GISService', 'ThemeHelper', 'WMSService', 'ThemeService', '$q'];
    module.factory('DataService', dataService);
})();