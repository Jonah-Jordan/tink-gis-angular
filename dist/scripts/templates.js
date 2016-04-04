angular.module('tink.gis').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/groupLayerTemplate.html',
    "<div class=layercontroller-checkbox> <input class=visible-box type=checkbox id={{grplyrctrl.grouplayer.name}}{{grplyrctrl.grouplayer.id}} ng-model=grplyrctrl.grouplayer.visible ng-change=grplyrctrl.chkChanged()> <label for={{grplyrctrl.grouplayer.name}}{{grplyrctrl.grouplayer.id}}>{{grplyrctrl.grouplayer.name}}</label> <div ng-repeat=\"layer in grplyrctrl.grouplayer.Layers | filter :  { enabled: true }\"> <tink-layer layer=layer> </tink-layer> </div> </div>"
  );


  $templateCache.put('templates/layerTemplate.html',
    "<div class=layercontroller-checkbox> <input class=visible-box type=checkbox ng-model=lyrctrl.layer.visible ng-change=lyrctrl.chkChanged() id={{layer.name}}{{layer.id}}> <label for={{layer.name}}{{layer.id}}> {{layer.name | limitTo: 20}}</label> </div>"
  );


  $templateCache.put('templates/layersTemplate.html',
    "<div data-tink-nav-aside=\"\" data-auto-select=true data-toggle-id=asideNavRight class=\"nav-aside nav-right\"> <aside> <div class=nav-aside-section> <ul ui-sortable ng-model=lyrsctrl.themes> <div ng-repeat=\"theme in lyrsctrl.themes\"> <tink-theme theme=theme> </tink-theme> </div> </ul> <button class=\"btn btn-primary addlayerbtn\" ng-click=lyrsctrl.AddLayers()>Voeg laag toe</button> </div> </aside> </div>"
  );


  $templateCache.put('templates/maptemplate.html',
    "<div class=tink-map> <div id=map class=leafletmap> <div class=\"btn-group ll searchbtns\"> <button type=button class=btn prevent-default><i class=\"fa fa-map-marker\"></i></button>\n" +
    "<button type=button class=btn prevent-default><i class=\"fa fa-download\"></i></button> </div> <div class=\"btn-group btn-group-vertical ll interactiebtns\"> <button type=button class=btn ng-click=\"mapctrl.interactieButtonChanged('identify')\" ng-class=\"{active: mapctrl.activeInteractieKnop=='identify'}\" prevent-default><i class=\"fa fa-info\"></i></button>\n" +
    "<button type=button class=btn ng-click=\"mapctrl.interactieButtonChanged('select')\" ng-class=\"{active: mapctrl.activeInteractieKnop=='select'}\" prevent-default><i class=\"fa fa-mouse-pointer\"></i></button>\n" +
    "<button type=button class=btn ng-click=\"mapctrl.interactieButtonChanged('meten')\" ng-class=\"{active: mapctrl.activeInteractieKnop=='meten'}\" prevent-default><i class=\"fa fa-expand\"></i></button>\n" +
    "<button type=button class=btn ng-click=\"mapctrl.interactieButtonChanged('watishier')\" ng-class=\"{active: mapctrl.activeInteractieKnop=='watishier'}\" prevent-default><i class=\"fa fa-thumb-tack\"></i></button>  </div> <div class=\"btn-group ll metenbtns\" ng-show=mapctrl.showMetenControls> <button ng-click=\"mapctrl.drawingButtonChanged('afstand')\" ng-class=\"{active: mapctrl.drawingType=='afstand'}\" type=button class=btn prevent-default><i class=\"fa fa-arrows-h\"></i></button>\n" +
    "<button ng-click=\"mapctrl.drawingButtonChanged('oppervlakte')\" ng-class=\"{active: mapctrl.drawingType=='oppervlakte'}\" type=button class=btn prevent-default><i class=\"fa fa-star-o\"></i></button> </div> <div class=\"btn-group ll drawingbtns\" ng-show=mapctrl.showDrawControls> <button ng-click=mapctrl.selectpunt() ng-class=\"{active: mapctrl.drawingType==''}\" type=button class=btn prevent-default><i class=\"fa fa-mouse-pointer\"></i></button>\n" +
    "<button ng-click=\"mapctrl.drawingButtonChanged('lijn')\" ng-class=\"{active: mapctrl.drawingType=='lijn'}\" type=button class=btn prevent-default><i class=\"fa fa-minus\"></i></button>\n" +
    "<button ng-click=\"mapctrl.drawingButtonChanged('vierkant')\" ng-class=\"{active: mapctrl.drawingType=='vierkant'}\" type=button class=btn prevent-default><i class=\"fa fa-square-o\"></i></button>\n" +
    "<button ng-click=\"mapctrl.drawingButtonChanged('polygon')\" ng-class=\"{active: mapctrl.drawingType=='polygon'}\" type=button class=btn prevent-default><i class=\"fa fa-star-o\"></i></button> </div> <div class=\"ll zoekbalken\"> <input class=zoekbalk placeholder=\"Welke locatie of adres zoek je?\" prevent-default> <select ng-options=\"layer as layer.name for layer in mapctrl.SelectableLayers\" ng-model=mapctrl.selectedLayer ng-change=mapctrl.layerChange() ng-class=\"{invisible: mapctrl.activeInteractieKnop!='select' || mapctrl.SelectableLayers.length<=1}\" prevent-default></select> </div> <div class=\"ll btn-group kaarttypes\"> <button class=btn ng-class=\"{active: mapctrl.kaartIsGetoond==true}\" ng-click=mapctrl.toonKaart() prevent-default>Kaart</button>\n" +
    "<button class=btn ng-class=\"{active: mapctrl.kaartIsGetoond==false}\" ng-click=mapctrl.toonLuchtfoto() prevent-default>Luchtfoto</button> </div> <div class=\"btn-group btn-group-vertical ll viewbtns\"> <button type=button class=btn ng-click=mapctrl.zoomIn() prevent-default><i class=\"fa fa-plus\"></i></button>\n" +
    "<button type=button class=btn ng-click=mapctrl.zoomOut() prevent-default><i class=\"fa fa-minus\"></i></button>\n" +
    "<button type=button class=btn ng-click=\"\" prevent-default><i class=\"fa fa-crosshairs\"></i></button>\n" +
    "<button type=button class=btn ng-click=mapctrl.fullExtent() prevent-default><i class=\"fa fa-home\"></i></button> </div> <div class=\"btn-group btn-group-vertical ll localiseerbtn\"> <button type=button class=btn prevent-default><i class=\"fa fa-male\"></i></button> </div> </div> <tink-search></tink-search> <tink-layers></tink-layers> </div>"
  );


  $templateCache.put('templates/modals/addLayerModalTemplate.html',
    "<div> <div class=modal-header> <button type=button style=float:right data-ng-click=cancel()><i class=\"fa fa-times\"></i></button> <h4 class=model-title>Laag toevoegen </h4></div> <div class=modal-content> <div class=row> <div class=col-md-4> <input class=searchbox ng-model=searchTerm ng-change=searchChanged() placeholder=\"Geef een trefwoord of een url in\"> <div ng-if=!searchIsUrl ng-repeat=\"theme in availableThemes | filter: { Naam: searchTerm } | orderBy: 'Naam'\"> <div ng-click=themeChanged(theme)> {{theme.Naam}}\n" +
    "<i ng-if=\"theme.Added == true\" class=\"fa fa-check-circle\"></i>\n" +
    "<i ng-if=\"theme.Added == null\" class=\"fa fa-check-circle-o\"></i> </div> </div> </div> <div class=col-md-8> <div ng-if=searchIsUrl> <button ng-click=laadUrl()>Laad url</button> </div> <div ng-if=\"copySelectedTheme !== null && !searchIsUrl\"> <button ng-if=\"copySelectedTheme.Added != false\" data-ng-click=AddOrUpdateTheme()>Update</button> <p>{{copySelectedTheme.Description}}</p> <p><small><a ng-href={{copySelectedTheme.CleanUrl}} target=_blank>Details</a></small></p> <div class=layercontroller-checkbox> <input indeterminate-checkbox child-list=copySelectedTheme.AllLayers property=enabled type=checkbox ng-model=copySelectedTheme.enabled id={{copySelectedTheme.name}}> <label for={{copySelectedTheme.name}}> {{copySelectedTheme.name | limitTo: 99}}</label> <div ng-repeat=\"mainlayer in copySelectedTheme.Layers\"> <div class=layercontroller-checkbox> <input type=checkbox ng-model=mainlayer.enabled id={{mainlayer.name}}{{mainlayer.id}}> <label for={{mainlayer.name}}{{mainlayer.id}}> {{mainlayer.name | limitTo: 99}}</label> </div> </div> <div ng-repeat=\"groupLayer in copySelectedTheme.Groups\"> <div class=layercontroller-checkbox> <input indeterminate-checkbox child-list=groupLayer.Layers property=enabled type=checkbox ng-model=groupLayer.enabled id={{groupLayer.name}}{{groupLayer.id}}> <label for={{groupLayer.name}}{{groupLayer.id}}> {{groupLayer.name | limitTo: 99}}</label> <div ng-repeat=\"layer in groupLayer.Layers\"> <div class=layercontroller-checkbox> <input type=checkbox ng-model=layer.enabled ng-change=layer.chkChanged() id={{layer.name}}{{layer.id}}> <label for={{layer.name}}{{layer.id}}> {{layer.name | limitTo: 99}}</label> </div> </div> </div> </div> </div> <button ng-if=\"copySelectedTheme.Added == false\" data-ng-click=AddOrUpdateTheme()>Toevoegen</button> </div> </div> </div> </div> <div class=modal-footer> <button data-ng-click=ok()>Klaar</button> </div> </div>"
  );


  $templateCache.put('templates/search/searchResultsTemplate.html',
    "<div ng-if=\"!srchrsltsctrl.selectedResult && srchrsltsctrl.featureLayers.length > 0\"> <select ng-model=srchrsltsctrl.layerGroupFilter> <option value=geenfilter selected>Geen filter</option> <option ng-repeat=\"feat in srchrsltsctrl.featureLayers\" value={{feat}}>{{feat}}</option> </select> <ul ng-repeat=\"layerGroupName in srchrsltsctrl.featureLayers\"> <tink-accordion ng-if=\"srchrsltsctrl.layerGroupFilter=='geenfilter' || srchrsltsctrl.layerGroupFilter==layerGroupName \" data-start-open=true data-one-at-a-time=false> <tink-accordion-panel> <data-header> <p class=nav-aside-title>{{layerGroupName}}\n" +
    "<button ng-click=srchrsltsctrl.deleteFeatureGroup(layerGroupName) class=pull-right style=\"z-index: 500\"><i class=\"fa fa-trash\"></i></button> </p>  </data-header> <data-content> <li ng-repeat=\"feature in srchrsltsctrl.features | filter: { layerName:layerGroupName } :true\" ng-mouseover=\"feature.hoverEdit = true\" ng-mouseleave=\"feature.hoverEdit = false\"> <a ng-if=!feature.hoverEdit ng-click=srchrsltsctrl.showDetails(feature)>{{ feature.displayValue | limitTo : 23}}<br>DETAILS</a> <div ng-if=feature.hoverEdit> <a ng-click=srchrsltsctrl.showDetails(feature)>{{ feature.displayValue}} <br>DETAILS</a>\n" +
    "<a ng-click=srchrsltsctrl.deleteFeature(feature)><i class=\"fa fa-trash\"></i></a> </div> </li> </data-content> </tink-accordion-panel> </tink-accordion> </ul> <a ng-click=srchrsltsctrl.exportToCSV()>Export to CSV</a> </div>"
  );


  $templateCache.put('templates/search/searchSelectedTemplate.html',
    "<div ng-if=srchslctdctrl.selectedResult> <div class=row> <div class=col-md-4> <button class=\"pull-left srchbtn\" ng-if=srchslctdctrl.prevResult ng-click=srchslctdctrl.vorige()>Vorige</button> </div> <div class=col-md-4> <button class=srchbtn ng-click=srchslctdctrl.delete()>Delete</button> </div> <div class=col-md-4> <button class=\"pull-right srchbtn\" ng-if=srchslctdctrl.nextResult ng-click=srchslctdctrl.volgende()>Volgende</button> </div> </div> <div class=row ng-repeat=\"prop in srchslctdctrl.props\"> <div class=col-md-5> {{ prop.key}} </div> <div class=col-md-7 ng-if=\"prop.value.toLowerCase() != 'null'\"> <a ng-if=\" prop.value.indexOf( 'https://')==0 || prop.value.indexOf( 'http://')==0 \" ng-href={{prop.value}} target=_blank>Link</a> <div ng-if=\"prop.value.indexOf( 'https://') !=0 && prop.value.indexOf( 'http://') !=0 \">{{ prop.value }}</div> </div> </div> <div class=row ng-show=\"srchslctdctrl.selectedResult.theme.Type === 'esri'\"> <div class=col-md-6> <button class=\"pull-left srchbtn\" ng-click=\"srchslctdctrl.toonFeatureOpKaart() \">Tonen</button> </div> <div class=col-md-6> <button class=\"pull-right srchbtn\" ng-click=\" \">Buffer</button> </div> </div> <button class=srchbtn ng-click=\"srchslctdctrl.close(srchslctdctrl.selectedResult) \">Terug naar resultaten</button> </div>"
  );


  $templateCache.put('templates/search/searchTemplate.html',
    "<div data-tink-nav-aside=\"\" data-auto-select=true data-toggle-id=asideNavLeft class=\"nav-aside nav-left\"> <aside> <div class=nav-aside-section> <tink-search-results></tink-search-results> <tink-search-selected></tink-search-selected> </div> </aside> </div>"
  );


  $templateCache.put('templates/themeTemplate.html',
    "<div> <input class=visible-box type=checkbox id=chk{{thmctrl.theme.Naam}} ng-model=thmctrl.theme.Visible ng-change=thmctrl.chkChanged()> <label for=chk{{thmctrl.theme.Naam}}> {{thmctrl.theme.Naam}} </label><i class=\"fa fa-trash pull-right\" ng-click=thmctrl.deleteTheme()></i> <div class=layercontroller-checkbox ng-repeat=\"layer in thmctrl.theme.Layers | filter: { enabled: true }\"> <tink-layer layer=layer> </tink-layer> </div> <div class=layercontroller-checkbox ng-repeat=\"group in thmctrl.theme.Groups | filter: { enabled: true }\"> <tink-grouplayer grouplayer=group> </tink-grouplayer> </div> </div>"
  );

}]);
