var map,vectorLayer,baselayer;

function init(){
  map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    view: new ol.View({
      projection: 'EPSG:900913',
      center: [-8015003.33712,4160979.44405],
      zoom: 5
    })
  });
  baselayer = new ol.layer.Tile({
    source: new ol.source.OSM()
  });

  vectorLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      preload: Infinity,
      url: 'http://felek.cns.umass.edu:8080/geoserver/wms',
      serverType: 'geoserver',
      params: {
        'LAYERS': "Streams:Developed", 'TILED': true
      }
    })
  });
  //设置透明度
  //vectorLayer.setOpacity(.3);
  map.addLayer(baselayer);
  map.addLayer(vectorLayer);
}

function removeTopLayer(){
  //map.removeLayer(vectorLayer);
  vectorLayer.setVisible(false);
}

