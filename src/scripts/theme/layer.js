var TinkGis;
(function (TinkGis) {
    'use strict';
    class LayerJSON {
        constructor() {
        }
    }
    TinkGis.LayerJSON = LayerJSON;
    class Layer extends LayerJSON {
        constructor(...args) {
            super(...args);
            this.parent = null;
            this.Layers = [];
            this.UpdateDisplayed = (currentScale) => {
                if (this.maxScale > 0 || this.minScale > 0) {
                    console.log('MinMaxandCurrentScale', this.maxScale, this.minScale, currentScale);
                    if (currentScale > this.maxScale && currentScale < this.minScale) {
                        this.displayed = true;
                    }
                    else {
                        this.displayed = false;
                    }
                }
            };
            this.toString = () => {
                return `Lay: (id: ${this.name})`;
            };
        }
        get hasLayers() {
            if (this.Layers) {
                return this.Layers.length > 0;
            }
            return false;
        }
        ;
        get ShouldBeVisible() {
            if (this.IsEnabledAndVisible && !this.hasLayers) {
                if (!this.parent || this.parent.IsEnabledAndVisible) {
                    return true;
                }
            }
            return false;
        }
        get IsEnabledAndVisible() {
            if (this.enabled && this.visible) {
                if (!this.parent) {
                    return true;
                }
                else {
                    return this.parent.IsEnabledAndVisible;
                }
            }
            return false;
        }
        get AllLayers() {
            var allLay = this.Layers;
            this.Layers.forEach(lay => {
                allLay = allLay.concat(lay.AllLayers);
            });
            return allLay;
        }
        ;
    }
    TinkGis.Layer = Layer;
    class wmslayer extends Layer {
        constructor(info, parenttheme) {
            super();
            Object.assign(this, info);
            this.visible = true;
            this.enabled = true;
            this.displayed = true;
            this.theme = parenttheme;
            this.queryable = info.queryable;
            this.id = this.name;
        }
    }
    TinkGis.wmslayer = wmslayer;
    class arcgislayer extends Layer {
        constructor(info, parenttheme) {
            super();
            Object.assign(this, info);
            this.visible = info.defaultVisibility;
            this.enabled = true;
            this.title = info.name;
            this.theme = parenttheme;
            this.displayed = true;
        }
    }
    TinkGis.arcgislayer = arcgislayer;
})(TinkGis || (TinkGis = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLE9BQU8sQ0FzR2hCO0FBdEdELFdBQVUsT0FBTyxFQUFDLENBQUM7SUFFZixZQUFZLENBQUM7SUFFYjtRQVFJO1FBQ0EsQ0FBQztJQUNMLENBQUM7SUFWWSxpQkFBUyxZQVVyQixDQUFBO0lBQ0Qsb0JBQW9DLFNBQVM7UUFBN0M7WUFBb0MsZUFBUztZQUd6QyxXQUFNLEdBQVUsSUFBSSxDQUFDO1lBSXJCLFdBQU0sR0FBaUIsRUFBRSxDQUFDO1lBa0MxQixvQkFBZSxHQUFHLENBQUMsWUFBWTtnQkFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztvQkFDakYsRUFBRSxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUMvRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDMUIsQ0FBQztvQkFDRCxJQUFJLENBQUMsQ0FBQzt3QkFDRixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFDM0IsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQyxDQUFDO1lBQ0ssYUFBUSxHQUFHO2dCQUVkLE1BQU0sQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUNyQyxDQUFDLENBQUE7UUFDTCxDQUFDO1FBL0NHLElBQUksU0FBUztZQUNULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dC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