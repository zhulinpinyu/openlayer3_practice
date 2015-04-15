var map;
function init(){
  map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    view: new ol.View({
      projection: 'EPSG:900913',
      center: [12701553.8995,2571663.04717],
      zoom: 5
    })
  });
  var layer = new ol.layer.Tile({
    source: new ol.source.OSM()
  });

  map.addLayer(layer);
}

