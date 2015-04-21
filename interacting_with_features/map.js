var countries = new ol.layer.Vector({
  source: new ol.source.GeoJSON({
    projection: 'EPSG:3857',
    url: '../data/countries.geojson'
  })
});

var center = ol.proj.transform([0,0],'EPSG:4326','EPSG:3857');

var view = new ol.View({
  center: center,
  zoom: 1
});

var map = new ol.Map({
  target: 'map',
  layers: [countries],
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