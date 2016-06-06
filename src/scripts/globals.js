/* global ThemeStatus, LayerType */
var ThemeStatus = { // http://stijndewitt.com/2014/01/26/enums-in-javascript/
    UNMODIFIED: 0,
    NEW: 1,
    UPDATED: 2,
    DELETED: 3
};
var LayerType = {
    LAYER: 0,
    GROUP: 1
};
var ActiveInteractieButton = {
    IDENTIFY: 'identify',
    SELECT: 'select',
    METEN: 'meten',
    WATISHIER: 'watishier'
};
const DrawingOption = {
    NIETS: '',
    AFSTAND: 'afstand',
    OPPERVLAKTE: 'oppervlakte',
    LIJN: 'lijn',
    VIERKANT: 'vierkant',
    POLYGON: 'polygon'
};
var ThemeType = {
    ESRI: 'esri',
    WMS: 'wms'
};
var Style = {
    DEFAULT: {
        fillOpacity: 0,
        color: 'blue',
        weight: 5
    },
    HIGHLIGHT: {
        weight: 7,
        color: 'red',
        fillOpacity: 0.5
    }
};

var Scales = [
    250000,
    200000,
    150000,
    100000,
    50000,
    25000,
    20000,
    15000,
    12500,
    10000,
    7500,
    5000,
    2500,
    2000,
    1500,
    1250,
    1000,
    750,
    500,
    250,
    100
]