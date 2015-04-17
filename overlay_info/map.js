var layer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var center = ol.proj.transform([114.01,22.51],'EPSG:4326','EPSG:3857');

var overlay = new ol.Overlay({
  element: document.getElementById('overlay'),
  positioning: 'bottom-center'
});

var view = new ol.View({
  center: center,
  zoom: 6
});

var map = new ol.Map({
  target: 'map',
  layers: [layer],
  view: view
});

map.on('click',function(e){
  var coord = e.coordinate;
  var degrees = ol.proj.transform(coord, 'EPSG:3857','EPSG:4326');
  var hdms = ol.coordinate.toStringHDMS(degrees);
  var element = overlay.getElement();
  element.innerHTML = hdms;
  overlay.setPosition(coord);
  map.addOverlay(overlay);
});