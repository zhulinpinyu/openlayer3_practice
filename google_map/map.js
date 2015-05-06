var gmap = new google.maps.Map(document.getElementById('gmap'), {
  disableDefaultUI: true,
  keyboardShortcuts: false,
  draggable: false,
  disableDoubleClickZoom: true,
  scrollwheel: false,
  streetViewControl: false
});

var view = new ol.View({
  maxZoom: 21
});

view.on('change:center', function() {
  var center = ol.proj.transform(view.getCenter(), 'EPSG:3857', 'EPSG:4326');
  gmap.setCenter(new google.maps.LatLng(center[1], center[0]));
});
view.on('change:resolution', function() {
  gmap.setZoom(view.getZoom());
});

var center = new ol.proj.transform([114.01, 22.51], 'EPSG:4326', 'EPSG:3857')
view.setCenter(center);
view.setZoom(18);

var olMapDiv = document.getElementById('olmap');
var map = new ol.Map({
  layers: [],
  target: olMapDiv,
  view: view
});

olMapDiv.parentNode.removeChild(olMapDiv);
gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(olMapDiv);