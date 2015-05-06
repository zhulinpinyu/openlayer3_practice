
var baiduLayer = new ol.layer.Tile({
  source: tilesource
});

var center = new ol.proj.transform([114.021,22.51],'EPSG:4326','EPSG:3857');

var view = new ol.View({
  center:  center,
  zoom: 12
})

var map = new ol.Map({
    view: view,
    layers:[baiduLayer],
    target: "map"
});