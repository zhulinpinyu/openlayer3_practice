var baseLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var heatmapLayer = new ol.layer.Heatmap({
  source: new ol.source.GeoJSON({
    url: './china_citys.json',
    projection: 'EPSG:3857'
  }),
  blur: 10,
  radius: 8,
  opacity: 0.6
});

var center = new ol.proj.transform([108.02,34.54],'EPSG:4326','EPSG:3857');

var view = new ol.View({
  center: center,
  zoom: 8
});

var map = new ol.Map({
  target: 'map',
  renderer: 'canvas',
  layers: [baseLayer, heatmapLayer],
  view: view
});

$(document).ready(function(){
  var blur = $("#blur");
  var radius = $("#radius");
  var visible = $("#visible");
  var opacity = $("#opacity");

  blur.on("change", function(){
    heatmapLayer.setBlur(parseInt(this.value,10));
  });
  radius.on("change", function(){
    heatmapLayer.setRadius(parseInt(this.value,10));
  });
  visible.on('change',function(){
    heatmapLayer.setVisible(this.checked);
  });
  visible.prop("checked",heatmapLayer.getVisible());
  opacity.on('change',function(){
    heatmapLayer.setOpacity(parseFloat(this.value,10));
  });
});