import { Layer, Util, Coordinate, DomUtil, Class } from 'maptalks';
import * as echarts from 'echarts';
import type { EChartsOption, ECharts } from 'echarts';

/**
 * set echart container dom attribute
 */
export class E4Layer extends Layer {
  _ecOptions: EChartsOption;
  _maptalksLayer: any;

  constructor(id: string, ecOptions: EChartsOption, options: object, maptalksLayer = null) {
    super(id, options);
    this._ecOptions = ecOptions;
    this._maptalksLayer = maptalksLayer;
  }

  getEChartsOption() {
    return this._ecOptions;
  }

  getAdditionalLayer() {
    return this._maptalksLayer;
  }

  setEChartsOption(ecOption: EChartsOption) {
    this._ecOptions = ecOption;

    if (this._getRenderer()) {
      this._getRenderer()._clearAndRedraw();
    }
    return this;
  }

  toJSON() {
    return {
      type: this.getJSONType(),
      id: this.getId(),
      ecOptions: this._ecOptions,
      options: this.config(),
    };
  }

  static fromJSON(json) {
    if (!json || json['type'] !== 'E3Layer') {
      return null;
    }
    return new E4Layer(json['id'], json['ecOptions'], json['options']);
  }
}

const options = {
  container: 'front',
  renderer: 'dom',
  hideOnZooming: false,
  hideOnMoving: false,
  hideOnRotating: false,
};

E4Layer.mergeOptions(options);

// E4Layer.registerJSONType('E4Layer');

class EChartsRenderer extends Class {
  [x: string]: any;
  _ec: ECharts | undefined;
  _container: HTMLElement | undefined;

  constructor(layer: any) {
    super();
    this.layer = layer;
  }

  render() {
    //init Container
    if (!this._container) {
      this._createLayerContainer();
    }
    //init echart
    if (!this._ec) {
      this._prepareECharts();
      this._ec = echarts.init(this._container!);
      this._ec.setOption(this.layer._ecOptions, false);
      const maptalks3DComponent = this._ec.getModel().getComponent('maptalks3D');
      const maptalks2DComponent = this._ec.getModel().getComponent('maptalks2D');
      this._ecMaptalks3D = maptalks3DComponent ? maptalks3DComponent.getMaptalks() : null;
      this._ecMaptalks2D = maptalks2DComponent ? maptalks2DComponent.getMaptalks() : null;
      if (this._ecMaptalks3D && this.layer.options['removeBaseLayer']) {
        this._ecMaptalks3D.removeBaseLayer();
      }
      if (this._ecMaptalks2D && this.layer.options['removeBaseLayer']) {
        this._ecMaptalks2D.removeBaseLayer();
      }
    }
    //resize
    else if (this._isVisible()) {
      this._ec.resize();
    }
    //
    this.layer.fire('layerload');
  }

  drawOnInteracting() {
    if (this._isVisible()) {
      this._clearAndRedraw();
    }
  }

  needToRedraw() {
    const map = this.getMap();
    const renderer = map._getRenderer();
    return (
      map.isInteracting() || (renderer && ((renderer.isStateChanged && renderer.isStateChanged()) || (renderer.isViewChanged && renderer.isViewChanged())))
    );
  }

  getMap() {
    return this.layer.getMap();
  }

  _isVisible() {
    return this._container && this._container.style.display === '';
  }

  show() {
    if (this._container) {
      this._container.style.display = '';
    }
  }

  hide() {
    if (this._container) {
      this._container.style.display = 'none';
    }
  }

  remove() {
    this._ec.clear();
    this._ec.dispose();
    delete this._ec;
    this._removeLayerContainer();
  }

  clear() {
    this._ec.clear();
  }

  setZIndex(z: string) {
    this._zIndex = z;
    if (this._container) {
      this._container.style.zIndex = z;
    }
  }

  isCanvasRender() {
    return false;
  }

  _prepareECharts() {
    //ecOptions
    const ecOptions = this.layer._ecOptions,
      map = this.getMap(),
      center = map.getCenter(),
      zoom = map.getZoom(),
      pitch = map.getPitch(),
      bearing = map.getBearing();
    //
    const series = ecOptions.series;
    if (series) {
      for (let i = series.length - 1; i >= 0; i--) series[i]['animation'] = false;
    }
    //register maptalks3D
    if (ecOptions.maptalks3D) {
      ecOptions.maptalks3D.center = [center.x, center.y];
      ecOptions.maptalks3D.zoom = zoom;
      ecOptions.maptalks3D.pitch = pitch;
      ecOptions.maptalks3D.bearing = bearing;
    }
    //2dcoordsys
    const maptalks2DCoordSys = this._createMaptalks2DCoordinateSystem(map);
    //2dmodal
    const maptalks2DModal = echarts.extendComponentModel({
      type: 'maptalks2D',
      getMaptalks: function () {
        return this.map;
      },
      defaultOption: {
        center: [104.114129, 37.550339],
        zoom: 5,
      },
    });
    //2drender
    const maptalks2DView = echarts.extendComponentView({
      type: 'maptalks2D',
      render: function (maptalksModel2D, ecModel, api) {},
    });
    //
    echarts.registerCoordinateSystem('maptalks2D', maptalks2DCoordSys); // Action
  }

  /**
   * 遵循maptalks2d
   * @param {Maptalks} map
   */
  _createMaptalks2DCoordinateSystem(map) {
    const Maptalks2DCoorSys = function (map, api) {
      this.map = map;
      this.dimensions = ['lng', 'lat'];
      this._mapOffset = [0, 0];
      this._api = api;
    };

    Maptalks2DCoorSys.prototype.dimensions = ['lng', 'lat'];

    Maptalks2DCoorSys.dimensions = Maptalks2DCoorSys.prototype.dimensions;

    Maptalks2DCoorSys.create = function (ecModel, api) {
      let maptalks2dCoordSys;

      ecModel.eachComponent('maptalks2D', function (maptalks2DModel) {
        maptalks2DModel.map = map;
        maptalks2DModel.coordinateSystem = maptalks2dCoordSys = new Maptalks2DCoorSys(map, api);
      });

      ecModel.eachSeries(function (seriesModel) {
        if (seriesModel.get('coordinateSystem') === 'maptalks2D') {
          seriesModel.coordinateSystem = maptalks2dCoordSys;
        }
      });
    };

    Util.extend(Maptalks2DCoorSys.prototype, {
      setMapOffset(mapOffset) {
        this._mapOffset = mapOffset;
      },

      dataToPoint(data) {
        const coord = new Coordinate(data);
        const px = this.map.coordinateToContainerPoint(coord);
        const mapOffset = this._mapOffset;
        return [px.x - mapOffset[0], px.y - mapOffset[1]];
      },

      pointToData(pt) {
        const mapOffset = this._mapOffset;
        const data = this.map.containerPointToCoordinate({
          x: pt[0] + mapOffset[0],
          y: pt[1] + mapOffset[1],
        });
        return [data.x, data.y];
      },

      getViewRect() {
        const size = this.map.getSize();
        return new echarts.graphic.BoundingRect(0, 0, size.width, size.height);
      },

      getRoamTransform() {
        return echarts.matrix.create();
      },
    });

    return Maptalks2DCoorSys;
  }

  _createLayerContainer() {
    const container = (this._container = DomUtil.createEl('div', ''));
    container.style.cssText = 'position:absolute;left:0px;top:0px;';
    if (this._zIndex) {
      container.style.zIndex = this._zIndex;
    }
    this._resetContainer();
    const parentContainer = this.layer.options['container'] === 'front' ? this.getMap()._panels['frontStatic'] : this.getMap()._panels['backStatic'];
    parentContainer.appendChild(container);
  }

  _removeLayerContainer() {
    if (this._container) {
      DomUtil.removeDomNode(this._container);
    }
    delete this._levelContainers;
  }

  _resetContainer() {
    const size = this.getMap().getSize();
    this._container.style.width = size.width + 'px';
    this._container.style.height = size.height + 'px';
  }

  getEvents() {
    return {
      _zoomstart: this.onZoomStart,
      _zoomend: this.onZoomEnd,
      _dragrotatestart: this.onDragRotateStart,
      _dragrotateend: this.onDragRotateEnd,
      _movestart: this.onMoveStart,
      _moveend: this.onMoveEnd,
      _resize: this._resetContainer,
    };
  }

  _clearAndRedraw() {
    if (this._container && this._container.style.display === 'none') {
      return;
    }
    const map = this.getMap(),
      center = map.getCenter(),
      zoom = map.getZoom(),
      pitch = map.getPitch(),
      bearing = map.getBearing();
    const ecMaptalks2D = this._ecMaptalks2D;
    const ecMaptalks3D = this._ecMaptalks3D;
    if (ecMaptalks2D) {
      ecMaptalks2D.setCenter([center.x, center.y]);
      ecMaptalks2D.setZoom(zoom);
      ecMaptalks2D.setPitch(pitch);
      ecMaptalks2D.setBearing(bearing);
      this._ec.resize();
    }
    if (ecMaptalks3D) {
      ecMaptalks3D.setCenter([center.x, center.y]);
      ecMaptalks3D.setZoom(zoom);
      ecMaptalks3D.setPitch(pitch);
      ecMaptalks3D.setBearing(bearing);
    }
  }

  onZoomStart() {
    if (!this.layer.options['hideOnZooming']) {
      return;
    }
    this.hide();
  }

  onZoomEnd() {
    if (!this.layer.options['hideOnZooming']) {
      return;
    }
    this.show();
    this._clearAndRedraw();
  }

  onDragRotateStart() {
    if (!this.layer.options['hideOnRotating']) {
      return;
    }
    this.hide();
  }

  onDragRotateEnd() {
    if (!this.layer.options['hideOnRotating']) {
      return;
    }
    this.show();
    this._clearAndRedraw();
  }

  onMoveStart() {
    if (!this.layer.options['hideOnMoving']) {
      return;
    }
    this.hide();
  }

  onMoveEnd() {
    if (!this.layer.options['hideOnMoving']) {
      return;
    }
    this.show();
    this._clearAndRedraw();
  }
}

E4Layer.registerRenderer('dom', EChartsRenderer);
