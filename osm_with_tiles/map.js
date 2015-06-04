var layer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
  })
});

var center = ol.proj.transform([114.02,22.534],'EPSG:4326','EPSG:3857');

var view = new ol.View({
  center: center,
  zoom: 14
});

var map = new ol.Map({
  target: 'map',
  layers: [layer],
  view: view
});