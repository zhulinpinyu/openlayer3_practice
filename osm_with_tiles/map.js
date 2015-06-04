var osm_layer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //url: "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
  })
});

var amap_layer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
  })
});

var center = ol.proj.transform([114.025044,22.531192],'EPSG:4326','EPSG:3857');

var view = new ol.View({
  center: center,
  zoom: 14,
  maxZoom: 18,
  minZoom: 4
});

var map = new ol.Map({
  target: 'map',
  layers: [osm_layer, amap_layer],
  view: view
});