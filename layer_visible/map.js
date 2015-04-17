var layer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var shenzhen = ol.proj.transform([114.01,22.51],'EPSG:4326','EPSG:3857');
var view = new ol.View({
  center: shenzhen,
  zoom: 7
});

var map = new ol.Map({
  target: 'map',
  layers: [layer],
  view: view
});

var visible = new ol.dom.Input($("#visible")[0]);
visible.bindTo('checked', layer, 'visible');