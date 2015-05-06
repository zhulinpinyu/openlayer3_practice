var baseLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var sz_storesLayer = new ol.layer.Heatmap({
  source: new ol.source.GeoJSON({
    url: './sz_stores.geo.json',
    projection: 'EPSG:3857'
  }),
  blur: 10,
  radius: 8,
  opacity: 0.6
});

var sh_storesLayer = new ol.layer.Heatmap({
  source: new ol.source.GeoJSON({
    url: './shanghai_stores.geo.json',
    projection: 'EPSG:3857'
  }),
  blur: 10,
  radius: 8,
  opacity: 0.6
});

var sz = [114.01,22.51];
var sh = [121.421,31.23];

var center = new ol.proj.transform(sh, 'EPSG:4326', 'EPSG:3857')

var view = new ol.View({
  center: center,
  zoom: 11
});

var map = new ol.Map({
  target: 'map',
  renderer: 'canvas',
  layers: [baseLayer, sz_storesLayer, sh_storesLayer],
  view: view
});