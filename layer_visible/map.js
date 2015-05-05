var osmlayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var baidulayer = new ol.layer.Tile({
  source: tilesource
});

var shenzhen = ol.proj.transform([114.01,22.51],'EPSG:4326','EPSG:3857');
var view = new ol.View({
  center: shenzhen,
  zoom: 12
});

var map = new ol.Map({
  target: 'map',
  layers: [osmlayer,baidulayer],
  view: view
});

$(document).ready(function(){
  var osm = new ol.dom.Input($("#osm")[0]);
  osm.bindTo('checked', osmlayer, 'visible');
  var baidu = new ol.dom.Input($("#baidu")[0]);
  baidu.bindTo('checked', baidulayer, 'visible');
});