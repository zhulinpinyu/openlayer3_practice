var baseLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var countries = new ol.layer.Vector({
  source: new ol.source.GeoJSON({
    projection: 'EPSG:3857',
    url: '../data/shanghai.json'
  })
});

var center = ol.proj.transform([121.49,31.201],'EPSG:4326','EPSG:3857');

var view = new ol.View({
  center: center,
  zoom: 9
});

var map = new ol.Map({
  target: 'map',
  layers: [baseLayer,countries],
  view: view
});

function onMouseMove(event){
  var coordinate = event.coordinate;
  var pixel = map.getPixelFromCoordinate(coordinate);
  var name = $('#name')[0];
  name.innerHTML = '';
  map.forEachFeatureAtPixel(pixel, function(feature){
    name.innerHTML += feature.get('name') + '<br>';
  });
}
map.on('pointermove', onMouseMove);