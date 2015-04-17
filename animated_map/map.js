var layer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var shenzhen = ol.proj.transform([114.01,22.51],'EPSG:4326','EPSG:3857');
var xian = ol.proj.transform([108.9,34.16],'EPSG:4326','EPSG:3857');
var shihezi = ol.proj.transform([86.01,44.16],'EPSG:4326','EPSG:3857');

var view = new ol.View({
  center: shenzhen,
  zoom: 8
});

var map = new ol.Map({
  target: 'map',
  layers: [layer],
  view: view
});

function doBounce(location){
  var bounce = ol.animation.bounce({
    resolution: map.getView().getResolution() * 2
  });

  var pan = ol.animation.pan({
    source: map.getView().getCenter()
  });

  map.beforeRender(bounce);
  map.beforeRender(pan);
  map.getView().setCenter(location);
}

function doPan(location){
  var pan = ol.animation.pan({
    source: map.getView().getCenter()
  });

  map.beforeRender(pan);
  map.getView().setCenter(location);
}

function doRotate(){
  var rotate = ol.animation.rotate({
    rotation: Math.PI * 2
  });
  map.beforeRender(rotate);
}

function doZoom(factor){
  var zoom = ol.animation.zoom({
    resolution: map.getView().getResolution()
  });
  map.beforeRender(zoom);
  map.getView().setResolution(map.getView().getResolution() * factor);
}