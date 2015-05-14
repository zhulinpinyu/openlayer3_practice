var baseLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

// var countries = new ol.layer.Vector({
//   source: new ol.source.GeoJSON({
//     projection: 'EPSG:3857',
//     url: '../ol3map/shenzhen.json'
//   })
// });

var heatmap_layer = new ol.layer.Heatmap({
  source: new ol.source.GeoJSON({
    url: 'data/sz_stores.geo.json',
    projection: 'EPSG:3857'
  }),
  blur: 8,
  radius: 10,
  opacity: 0.6
});

var center = ol.proj.transform([114.02119626522052, 22.5349213989154],'EPSG:4326','EPSG:3857');
//-122.0312186,37.33233141
var view = new ol.View({
  center: center,
  zoom: 16
});

var map = new ol.Map({
  target: 'map',
  layers: [baseLayer],
  view: view,
  controls: []
});

p1 = {
  name: "KFC",
  size: 20
}

p2 = {
  name: "MCD",
  size: 31
}



pin_flag(22.5449213989154,114.02119626522052,p1);
pin_flag(22.5349213989154,114.03119626522052,p2);

function addHeatmap(){
  map.addLayer(heatmap_layer);
}

function basicMap(){
  map.removeLayer(heatmap_layer);
}

function marker(location){
  return new ol.Overlay({
    position: location,
    element: $('<span class="glyphicon glyphicon-map-marker" aria-hidden="true" style="color: darkviolet; font-size: 21px; left: -12px; top: -23px;"></span>')
  });
}

function pin_flag(lat,lon,properties){
  var location = ol.proj.transform([lon,lat],'EPSG:4326','EPSG:3857');
  var flag = new ol.Overlay({
    position: location,
    element: $('<span class="glyphicon glyphicon-flag" aria-hidden="true" style="color: rgb(249, 18, 18); font-size: 26px; top: -26px; left: -2px"></span>')
  });
  flag.setProperties(properties);
  map.addOverlay(flag);
}

var overlays = map.getOverlays();
overlays.forEach(function(overlay){
  $(overlay.getElement()[0]).on("click",function(e){
    var info = overlay.getPosition() + "-->" + overlay.getProperties().name;
    document.location = "ol3map://alert/"+info;
  });
});

function pin(e){
  var coord_3857 = e.coordinate;
  var coord_4326 = ol.proj.transform(coord_3857, 'EPSG:3857', 'EPSG:4326');
  document.location = "ol3map://alert/"+coord_4326;
}

// function onClickMap(event){
//   var coordinate = event.coordinate;
//   var pixel = map.getPixelFromCoordinate(coordinate);
//   var degrees = ol.proj.transform(coordinate, 'EPSG:3857','EPSG:4326');
//   //var hdms = ol.coordinate.toStringHDMS(degrees)
//   var value = "";
//   map.forEachFeatureAtPixel(pixel, function(feature){
//     //var value = feature.get('name')+"("+hdms+")"
//      value += " " + feature.get('lgl_biz_name');
//   });
//   document.location = "ol3map://alert/"+value;
// }
// map.on('click', onClickMap);
map.on('click', pin);

function setCenter(lat,lon){
  //var location = ol.proj.transform([lon,lat],'EPSG:4326','EPSG:3857');
  var location = ol.proj.transform([114.02119626522052,22.5449213989154],'EPSG:4326','EPSG:3857');
  map.getView().setCenter(location);
  map.addOverlay(marker(location));
}

function orientation(){
  document.location = "ol3map://center/"
}